import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationPL from "../translations/pl.json";
import translationEN from "../translations/en.json";

const resources = {
  pl: {
    translation: translationPL,
  },
  en: {
    translation: translationEN,
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "en",
      // lng: localStorage.getItem('i18nextLng') || 'en', // LanguageDetector powinien to obsłużyć
      debug: import.meta.env.DEV,
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ["localStorage", "navigator", "htmlTag"], // Dodano htmlTag dla pewności
        caches: ["localStorage"],
      },
      react: {
        useSuspense: true,
      },
    });
}

export default i18n;
