import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Search, Loader2, Sparkles, FileText, TrendingUp, Lightbulb, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ScoutingResult {
  id: string;
  title: string;
  summary: string;
  insights: string[];
  sources: string[];
  confidence: number;
}

const Scouting: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScoutingResult | null>(null);

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a search query.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // Placeholder for AI API call - will integrate with backend connector
      await new Promise((resolve) => setTimeout(resolve, 2500));
      
      // Mock result - will be replaced with actual API response
      const mockResult: ScoutingResult = {
        id: crypto.randomUUID(),
        title: `Technology Analysis: ${query.slice(0, 50)}${query.length > 50 ? '...' : ''}`,
        summary: `Based on comprehensive analysis of the technology landscape, we've identified key trends and opportunities related to your query. The market is experiencing significant shifts driven by digital transformation, AI integration, and sustainability requirements.`,
        insights: [
          'Market leaders are investing heavily in AI-powered automation solutions',
          'Emerging startups are disrupting traditional approaches with innovative platforms',
          'Regulatory changes are creating new compliance requirements and opportunities',
          'Cross-industry collaboration is accelerating technology adoption cycles',
        ],
        sources: [
          'Gartner Technology Trends Report 2024',
          'MIT Technology Review',
          'Industry Analyst Reports',
          'Patent Database Analysis',
        ],
        confidence: 0.87,
      };
      
      setResult(mockResult);
      toast({
        title: 'Research Complete',
        description: 'Your technology scouting analysis is ready.',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to complete research. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const exampleQueries = [
    'What are the latest advancements in industrial AI and automation?',
    'Compare leading digital twin platforms for manufacturing',
    'Emerging startups in sustainable materials technology',
    'Technology trends in automotive electrification',
  ];

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-accent-foreground">AI-Powered Research</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('scouting.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('scouting.subtitle')}
            </p>
          </div>

          {/* Search Interface */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <div className="space-y-4">
                <Textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('scouting.query.placeholder')}
                  rows={4}
                  className="resize-none"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handleSearch}
                    disabled={loading || !query.trim()}
                    className="flex-1 sm:flex-none"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        {t('scouting.query.submit')}
                      </>
                    )}
                  </Button>
                  {result && (
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        setQuery('');
                        setResult(null);
                      }}
                    >
                      <RefreshCw className="w-4 h-4" />
                      New Search
                    </Button>
                  )}
                </div>
              </div>

              {/* Example Queries */}
              {!result && !loading && (
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-3">Try these examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {exampleQueries.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setQuery(example)}
                        className="text-xs px-3 py-1.5 bg-secondary rounded-full text-secondary-foreground hover:bg-accent transition-colors"
                      >
                        {example.slice(0, 40)}...
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-card border border-border rounded-2xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-hero rounded-full animate-ping opacity-30" />
                  <div className="relative w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center">
                    <Search className="w-6 h-6 text-primary-foreground animate-pulse" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t('scouting.results.loading')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Scanning industry reports, patent databases, and research publications...
                </p>
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
              {/* Main Result Card */}
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">
                    {result.title}
                  </h2>
                  <div className="flex items-center gap-2 px-3 py-1 bg-accent rounded-full">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-medium text-accent-foreground">
                      {Math.round(result.confidence * 100)}% confidence
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  {result.summary}
                </p>

                {/* Insights */}
                <div className="mb-6">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    Key Insights
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {result.insights.map((insight, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl"
                      >
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-3 h-3 text-primary" />
                        </div>
                        <p className="text-sm text-foreground">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sources */}
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
                    <FileText className="w-5 h-5 text-primary" />
                    Sources
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

              {/* Disclaimer */}
              <div className="bg-accent/50 rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground">
                  This analysis is generated using AI and should be validated with primary research. 
                  Results are based on publicly available information and may not reflect the most recent developments.
                </p>
              </div>
            </div>
          )}

          {/* Welcome Message (when no search performed) */}
          {!result && !loading && (
            <div className="max-w-3xl mx-auto mt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto bg-accent rounded-xl flex items-center justify-center mb-4">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Market Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Discover emerging technologies and market trends
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto bg-accent rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Competitive Intel</h3>
                  <p className="text-sm text-muted-foreground">
                    Track competitor activities and innovations
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto bg-accent rounded-xl flex items-center justify-center mb-4">
                    <Lightbulb className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Strategic Insights</h3>
                  <p className="text-sm text-muted-foreground">
                    Get actionable recommendations for your strategy
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
