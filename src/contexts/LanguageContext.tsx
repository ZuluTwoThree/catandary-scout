import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export type Language = "en" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
  error: string | null;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem("catandary-language");
    return (stored as Language) || "en";
  });
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("catandary-language", lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    let isActive = true;

    const loadTranslations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/locales/${language}.json`);
        if (!response.ok) {
          throw new Error("Failed to load translations.");
        }
        const data = (await response.json()) as Record<string, string>;
        if (isActive) {
          setTranslations(data);
        }
      } catch (err) {
        if (isActive) {
          setTranslations({});
          setError(err instanceof Error ? err.message : "Translation load failed.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadTranslations();

    return () => {
      isActive = false;
    };
  }, [language]);

  const t = useMemo(() => {
    return (key: string) => translations[key] || key;
  }, [translations]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading, error }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
