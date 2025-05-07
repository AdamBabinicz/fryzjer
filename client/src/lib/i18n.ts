import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationPL from '../translations/pl.json';
import translationEN from '../translations/en.json';

// This ensures we have a single instance of i18n
let initialized = false;

/**
 * Singleton pattern for i18n initialization
 * This prevents multiple initializations in React strict mode
 * and ensures consistent language settings
 */
export const setupI18n = () => {
  if (initialized) return i18n;
  
  console.log('Initializing i18n with languages:', { pl: !!translationPL, en: !!translationEN });
  
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
  i18n
    // Detect user language
    .use(LanguageDetector)
    // Pass the i18n instance to react-i18next
    .use(initReactI18next)
    // Init i18next
    .init({
      resources,
      fallbackLng: 'en',
      lng: localStorage.getItem('i18nextLng') || 'en', // Explicitly use stored language or default
      
      // Turn on debug only in development
      debug: process.env.NODE_ENV === 'development',
      
      interpolation: {
        escapeValue: false, // React already safes from XSS
      },
      
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },
      
      react: {
        useSuspense: true,
      }
    });
    
  initialized = true;
  return i18n;
};

// Initialize immediately
setupI18n();

export default i18n;
