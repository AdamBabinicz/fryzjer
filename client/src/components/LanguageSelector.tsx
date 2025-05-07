import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

interface LanguageSelectorProps {
  isMobile?: boolean;
}

const LanguageSelector = ({ isMobile = false }: LanguageSelectorProps) => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  
  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
    setIsDropdownOpen(false);
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center text-primary dark:text-white hover:text-accent dark:hover:text-accent transition duration-300 ease-in-out"
        aria-label={t('accessibility.changeLanguage')}
      >
        <span>{language.toUpperCase()}</span>
        <FaGlobe className="ml-1 text-xs" />
      </button>
      <div 
        className={`${isDropdownOpen ? 'block' : 'hidden'} absolute ${isMobile ? 'left-0' : 'right-0'} mt-2 w-24 bg-white dark:bg-[#1e1e1e] rounded-md shadow-lg z-20`}
      >
        <button 
          onClick={() => handleLanguageChange('pl')}
          className="block w-full text-left px-4 py-2 text-sm text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700"
        >
          Polski
        </button>
        <button 
          onClick={() => handleLanguageChange('en')}
          className="block w-full text-left px-4 py-2 text-sm text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700"
        >
          English
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
