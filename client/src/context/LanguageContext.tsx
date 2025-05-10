import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import i18nInstance from "../lib/i18n"; // Upewnij się, że ta ścieżka jest poprawna

interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => void;
}

// Domyślna wartość dla kontekstu, jeśli używany poza providerem
const defaultContextValue: LanguageContextType = {
  language:
    (typeof window !== "undefined"
      ? i18nInstance.language.split("-")[0]
      : "en") || "en", // Bezpieczniejsza inicjalizacja
  changeLanguage: (lang: string) => {
    // POPRAWIONA WŁAŚCIWOŚĆ
    console.warn(
      "changeLanguage called outside of LanguageProvider for lang:",
      lang
    );
    // Można by tu wywołać i18nInstance.changeLanguage(lang) dla spójności domyślnego zachowania,
    // ale główna logika powinna być w providerze.
  },
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

// ... reszta kodu LanguageProvider i useLanguage pozostaje taka sama jak w poprzedniej poprawnej odpowiedzi ...

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentContextLanguage, setCurrentContextLanguage] = useState<string>(
    () => {
      return (
        (typeof window !== "undefined"
          ? i18nInstance.language.split("-")[0]
          : "en") || "en"
      );
    }
  );

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setCurrentContextLanguage(lng.split("-")[0]);
    };

    // Sync initial state again in case i18n initialized after initial useState call
    if (typeof window !== "undefined") {
      setCurrentContextLanguage(i18nInstance.language.split("-")[0] || "en");
    }

    i18nInstance.on("languageChanged", handleLanguageChanged);

    return () => {
      i18nInstance.off("languageChanged", handleLanguageChanged);
    };
  }, []);

  const changeLanguage = useCallback((lang: string) => {
    i18nInstance.changeLanguage(lang);
  }, []);

  return (
    <LanguageContext.Provider
      value={{ language: currentContextLanguage, changeLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined || context === defaultContextValue) {
    // context === defaultContextValue jest bardziej precyzyjne
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
