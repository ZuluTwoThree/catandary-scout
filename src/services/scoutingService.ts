export type LlmProvider = "openai" | "anthropic" | "gemini";

export interface ScoutingRequest {
  query: string;
  models?: LlmProvider[];
  mode?: "parallel" | "compare";
}

export interface ScoutingResult {
  id: string;
  model: LlmProvider;
  title: string;
  summary: string;
  insights: string[];
  sources: string[];
  confidence: number;
}

export const DEFAULT_MODELS: LlmProvider[] = ["openai", "anthropic", "gemini"];

const getEndpoint = () => {
  const base = import.meta.env.VITE_SCOUTING_API_URL?.trim();
  if (!base) {
    return "/api/scouting";
  }
  return `${base.replace(/\\/$/, "")}/scouting`;
};

const mockResults = (query: string, models: LlmProvider[]): ScoutingResult[] => {
  return models.map((model) => ({
    id: crypto.randomUUID(),
    model,
    title: `Technology Analysis (${model}): ${query.slice(0, 40)}${query.length > 40 ? "..." : ""}`,
    summary:
      "Based on current market signals, investment flows, and product launches, the selected domain shows acceleration in adoption, ecosystem consolidation, and regulatory standardization across core industries.",
    insights: [
      "Leading incumbents are partnering with specialist startups to reduce time-to-market.",
      "Open platforms are winning due to integration flexibility and lower switching costs.",
      "Regulatory compliance is shifting toward real-time audit readiness.",
      "Verticalized solutions outperform horizontal tools in early adoption cycles.",
    ],
    sources: [
      "Industry Analyst Briefing",
      "Patent Filing Trends",
      "Vendor Benchmark Reports",
      "Research Consortium Updates",
    ],
    confidence: 0.82,
  }));
};

export const runScouting = async (
  request: ScoutingRequest,
  signal?: AbortSignal
): Promise<ScoutingResult[]> => {
  const models = request.models?.length ? request.models : DEFAULT_MODELS;
  const useMocks = import.meta.env.VITE_SCOUTING_USE_MOCKS === "true";

  if (useMocks) {
    return mockResults(request.query, models);
  }

  const response = await fetch(getEndpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: request.query,
      models,
      mode: request.mode ?? "parallel",
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to retrieve scouting results.");
  }

  const payload = (await response.json()) as { results?: ScoutingResult[] };
  if (!payload.results) {
    throw new Error("Invalid scouting response shape.");
  }

  return payload.results;
};
