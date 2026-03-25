import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function detectBrowserLanguage(): Language {
  const stored = localStorage.getItem("ar-language");
  if (stored === "en" || stored === "es") return stored;

  const browserLang = navigator.language || (navigator as any).userLanguage || "en";
  if (browserLang.startsWith("es")) return "es";
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(detectBrowserLanguage);
  const [translations, setTranslations] = useState<Record<string, string>>({});

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("ar-language", lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
    if (language === "es") {
      import("@/i18n/es").then((mod) => setTranslations(mod.default));
    } else {
      import("@/i18n/en").then((mod) => setTranslations(mod.default));
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
