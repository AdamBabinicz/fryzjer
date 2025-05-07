import { createContext, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: i18n.language || 'en',
  changeLanguage: (lang: string) => {
    i18n.changeLanguage(lang);
  }
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'en');
  
  // Initialize language from i18n
  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };
  
  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
}
