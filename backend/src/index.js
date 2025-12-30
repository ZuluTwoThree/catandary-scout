import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { randomUUID } from "node:crypto";

dotenv.config();

const app = express();
const port = process.env.PORT || 8081;
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",").map((item) => item.trim());

app.use(
  cors({
    origin: allowedOrigins?.length ? allowedOrigins : "*",
  })
);
app.use(express.json());

const DEFAULT_MODELS = ["openai", "anthropic", "gemini"];

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/scouting", async (req, res) => {
  const { query, models = DEFAULT_MODELS } = req.body || {};

  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Missing query" });
  }

  const normalizedModels = models.filter((model) => DEFAULT_MODELS.includes(model));
  if (!normalizedModels.length) {
    return res.status(400).json({ error: "No valid models provided" });
  }

  // TODO: Replace with real provider calls to OpenAI, Anthropic, and Gemini.
  const results = normalizedModels.map((model) => buildMockResult(model, query));
  return res.json({ results });
});

app.listen(port, () => {
  console.log(`Catandary proxy listening on :${port}`);
});

const buildMockResult = (model, query) => {
  return {
    id: randomUUID(),
    model,
    title: `Technology Analysis (${model}): ${query.slice(0, 40)}${query.length > 40 ? "..." : ""}`,
    summary:
      "Signals suggest accelerated adoption, ecosystem consolidation, and increased regulatory scrutiny across core industry segments.",
    insights: [
      "Incumbents are consolidating partnerships to reduce time-to-market.",
      "Integration-ready platforms are gaining share due to lower switching costs.",
      "Regulatory timelines are driving demand for audit-ready data pipelines.",
      "Sector-specific solutions outperform horizontal tools in early deployments.",
    ],
    sources: [
      "Industry Analyst Briefing",
      "Patent Filing Trends",
      "Vendor Benchmark Reports",
      "Research Consortium Updates",
    ],
    confidence: 0.82,
  };
};
