import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationPL from '../translations/pl.json';
import translationEN from '../translations/en.json';

// Resources for i18next
const resources = {
  pl: {
    translation: translationPL
  },
  en: {
    translation: translationEN
  }
};

// Initialize i18next
if (!i18n.isInitialized) {
  i18n
    // Detect user language
    .use(LanguageDetector)
    // Pass the i18n instance to react-i18next
    .use(initReactI18next)
    // Init i18next
    .init({
      resources,
      fallbackLng: 'pl',
      debug: false,
      
      interpolation: {
        escapeValue: false, // React already safes from XSS
      },
      
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      }
    });
}

export default i18n;
