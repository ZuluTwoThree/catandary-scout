import React, { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  FileText,
  Lightbulb,
  Loader2,
  RefreshCw,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  DEFAULT_MODELS,
  runScouting,
  type LlmProvider,
  type ScoutingResult,
} from "@/services/scoutingService";

const Scouting: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ScoutingResult[]>([]);
  const [streamedSummaries, setStreamedSummaries] = useState<
    Partial<Record<LlmProvider, string>>
  >({});
  const [viewMode, setViewMode] = useState<"grid" | "compare">("grid");

  const models = DEFAULT_MODELS;

  const resultsByModel = useMemo(() => {
    return results.reduce<Record<LlmProvider, ScoutingResult | undefined>>(
      (acc, result) => {
        acc[result.model] = result;
        return acc;
      },
      {
        openai: undefined,
        anthropic: undefined,
        gemini: undefined,
      }
    );
  }, [results]);

  const exampleQueries = useMemo(
    () => [
      t("scouting.examples.0"),
      t("scouting.examples.1"),
      t("scouting.examples.2"),
      t("scouting.examples.3"),
    ],
    [t]
  );

  const mutation = useMutation({
    mutationFn: ({ query: nextQuery }: { query: string }) =>
      runScouting({
        query: nextQuery,
        models,
        mode: viewMode === "compare" ? "compare" : "parallel",
      }),
    onSuccess: (data) => {
      setResults(data);
      toast({
        title: t("scouting.toast.success.title"),
        description: t("scouting.toast.success.description"),
      });
    },
    onError: () => {
      toast({
        title: t("scouting.toast.error.title"),
        description: t("scouting.toast.error.description"),
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (!results.length) {
      return;
    }

    const timers: Array<ReturnType<typeof setInterval>> = [];
    results.forEach((result) => {
      const full = result.summary;
      let index = 0;

      setStreamedSummaries((prev) => ({ ...prev, [result.model]: "" }));

      const timer = setInterval(() => {
        index = Math.min(index + 6, full.length);
        setStreamedSummaries((prev) => ({
          ...prev,
          [result.model]: full.slice(0, index),
        }));

        if (index >= full.length) {
          clearInterval(timer);
        }
      }, 18);

      timers.push(timer);
    });

    return () => {
      timers.forEach(clearInterval);
    };
  }, [results]);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleSearch = () => {
    if (!query.trim()) {
      toast({
        title: t("scouting.toast.empty.title"),
        description: t("scouting.toast.empty.description"),
        variant: "destructive",
      });
      return;
    }

    setResults([]);
    setStreamedSummaries({});
    mutation.mutate({ query: query.trim() });
  };

  const hasResults = results.length > 0;
  const isLoading = mutation.isPending;

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-accent-foreground">
                {t("scouting.badge")}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("scouting.title")}
            </h1>
            <p className="text-lg text-muted-foreground">{t("scouting.subtitle")}</p>
          </div>

          <div className="max-w-3xl mx-auto mb-10">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <div className="space-y-4">
                <Textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("scouting.query.placeholder")}
                  rows={4}
                  className="resize-none"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handleSearch}
                    disabled={isLoading || !query.trim()}
                    className="flex-1 sm:flex-none"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t("scouting.query.loading")}
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        {t("scouting.query.submit")}
                      </>
                    )}
                  </Button>
                  {hasResults && (
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        setQuery("");
                        setResults([]);
                        setStreamedSummaries({});
                      }}
                    >
                      <RefreshCw className="w-4 h-4" />
                      {t("scouting.query.reset")}
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {t("scouting.view.label")}
                  </span>
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    {t("scouting.view.grid")}
                  </Button>
                  <Button
                    variant={viewMode === "compare" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("compare")}
                  >
                    {t("scouting.view.compare")}
                  </Button>
                </div>
              </div>

              {!hasResults && !isLoading && (
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-3">
                    {t("scouting.examples.title")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exampleQueries.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setQuery(example)}
                        className="text-xs px-3 py-1.5 bg-secondary rounded-full text-secondary-foreground hover:bg-accent transition-colors"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {isLoading && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-card border border-border rounded-2xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-hero rounded-full animate-ping opacity-30" />
                  <div className="relative w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center">
                    <Search className="w-6 h-6 text-primary-foreground animate-pulse" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t("scouting.results.loading")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("scouting.results.loading.detail")}
                </p>
              </div>
            </div>
          )}

          {hasResults && viewMode === "grid" && (
            <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {models.map((model) => {
                  const result = resultsByModel[model];
                  if (!result) {
                    return null;
                  }

                  const streamed = streamedSummaries[model] ?? "";
                  const isStreaming = streamed.length < result.summary.length;

                  return (
                    <ErrorBoundary
                      key={result.id}
                      fallback={
                        <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-6 text-sm text-destructive">
                          {t("scouting.error.module")}
                        </div>
                      }
                    >
                      <div className="bg-card border border-border rounded-2xl p-6 shadow-lg h-full flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                              {t(`scouting.model.${model}`)}
                            </p>
                            <h2 className="text-lg font-bold text-foreground">
                              {result.title}
                            </h2>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1 bg-accent rounded-full">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-xs font-medium text-accent-foreground">
                              {Math.round(result.confidence * 100)}% {t("scouting.confidence")}
                            </span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground min-h-[88px]">
                            {streamed}
                            {isStreaming ? "…" : ""}
                          </p>
                          {isStreaming && (
                            <p className="mt-2 text-xs text-primary">
                              {t("scouting.streaming")}
                            </p>
                          )}
                        </div>
                        <div className="mb-4">
                          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                            <Lightbulb className="w-4 h-4 text-primary" />
                            {t("scouting.insights.title")}
                          </h3>
                          <div className="space-y-2">
                            {result.insights.map((insight, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3 p-3 bg-secondary/50 rounded-xl"
                              >
                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <TrendingUp className="w-3 h-3 text-primary" />
                                </div>
                                <p className="text-xs text-foreground">{insight}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-auto">
                          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                            <FileText className="w-4 h-4 text-primary" />
                            {t("scouting.sources.title")}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {result.sources.map((source, index) => (
                              <span
                                key={index}
                                className="text-xs px-3 py-1.5 bg-muted rounded-full text-muted-foreground"
                              >
                                {source}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </ErrorBoundary>
                  );
                })}
              </div>
              <div className="bg-accent/50 rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground">
                  {t("scouting.disclaimer")}
                </p>
              </div>
            </div>
          )}

          {hasResults && viewMode === "compare" && (
            <div className="max-w-6xl mx-auto animate-fade-in">
              <div className="bg-card border border-border rounded-2xl p-4 md:p-6 shadow-lg overflow-x-auto">
                <table className="min-w-[900px] w-full text-sm">
                  <thead>
                    <tr className="text-left">
                      <th className="pb-4 text-muted-foreground">
                        {t("scouting.compare.dimension")}
                      </th>
                      {models.map((model) => (
                        <th key={model} className="pb-4 text-foreground">
                          {t(`scouting.model.${model}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="py-4 font-medium text-foreground">
                        {t("scouting.compare.summary")}
                      </td>
                      {models.map((model) => {
                        const result = resultsByModel[model];
                        if (!result) {
                          return <td key={model} className="py-4" />;
                        }
                        const streamed = streamedSummaries[model] ?? "";
                        const isStreaming = streamed.length < result.summary.length;
                        return (
                          <td key={model} className="py-4 pr-4 align-top">
                            <ErrorBoundary
                              fallback={
                                <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
                                  {t("scouting.error.module")}
                                </div>
                              }
                            >
                              <p className="text-muted-foreground">
                                {streamed}
                                {isStreaming ? "…" : ""}
                              </p>
                              {isStreaming && (
                                <p className="mt-2 text-xs text-primary">
                                  {t("scouting.streaming")}
                                </p>
                              )}
                            </ErrorBoundary>
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="border-t border-border">
                      <td className="py-4 font-medium text-foreground">
                        {t("scouting.compare.insights")}
                      </td>
                      {models.map((model) => {
                        const result = resultsByModel[model];
                        if (!result) {
                          return <td key={model} className="py-4" />;
                        }
                        return (
                          <td key={model} className="py-4 pr-4 align-top">
                            <ErrorBoundary
                              fallback={
                                <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
                                  {t("scouting.error.module")}
                                </div>
                              }
                            >
                              <ul className="space-y-2 text-muted-foreground">
                                {result.insights.map((insight, index) => (
                                  <li key={index}>• {insight}</li>
                                ))}
                              </ul>
                            </ErrorBoundary>
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="border-t border-border">
                      <td className="py-4 font-medium text-foreground">
                        {t("scouting.compare.sources")}
                      </td>
                      {models.map((model) => {
                        const result = resultsByModel[model];
                        if (!result) {
                          return <td key={model} className="py-4" />;
                        }
                        return (
                          <td key={model} className="py-4 pr-4 align-top">
                            <ErrorBoundary
                              fallback={
                                <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
                                  {t("scouting.error.module")}
                                </div>
                              }
                            >
                              <div className="flex flex-wrap gap-2">
                                {result.sources.map((source, index) => (
                                  <span
                                    key={index}
                                    className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground"
                                  >
                                    {source}
                                  </span>
                                ))}
                              </div>
                            </ErrorBoundary>
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="border-t border-border">
                      <td className="py-4 font-medium text-foreground">
                        {t("scouting.compare.confidence")}
                      </td>
                      {models.map((model) => {
                        const result = resultsByModel[model];
                        if (!result) {
                          return <td key={model} className="py-4" />;
                        }
                        return (
                          <td key={model} className="py-4 pr-4 align-top">
                            <ErrorBoundary
                              fallback={
                                <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
                                  {t("scouting.error.module")}
                                </div>
                              }
                            >
                              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                                {Math.round(result.confidence * 100)}% {t("scouting.confidence")}
                              </span>
                            </ErrorBoundary>
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-accent/50 rounded-xl p-4 text-center mt-6">
                <p className="text-xs text-muted-foreground">
                  {t("scouting.disclaimer")}
                </p>
              </div>
            </div>
          )}

          {!hasResults && !isLoading && (
            <div className="max-w-3xl mx-auto mt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto bg-accent rounded-xl flex items-center justify-center mb-4">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {t("scouting.welcome.market.title")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("scouting.welcome.market.description")}
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto bg-accent rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {t("scouting.welcome.competitive.title")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("scouting.welcome.competitive.description")}
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto bg-accent rounded-xl flex items-center justify-center mb-4">
                    <Lightbulb className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {t("scouting.welcome.strategy.title")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("scouting.welcome.strategy.description")}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Scouting;
