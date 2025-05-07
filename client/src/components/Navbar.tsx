import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
import { GiMirrorMirror } from 'react-icons/gi';
import { FaBars, FaChevronDown } from 'react-icons/fa';

interface NavbarProps {
  onHomeClick: () => void;
  onAboutClick: () => void;
  onServicesClick: () => void;
  onGalleryClick: () => void;
  onContactClick: () => void;
}

const Navbar = ({
  onHomeClick,
  onAboutClick,
  onServicesClick,
  onGalleryClick,
  onContactClick
}: NavbarProps) => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  
  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when clicking a link
  const handleLinkClick = (callback: () => void) => {
    callback();
    setIsMobileMenuOpen(false);
  };
  
  // Scroll to specific section within Services
  const scrollToServiceSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Adjust for header height
        behavior: 'smooth',
      });
    }
    
    setIsMobileMenuOpen(false);
  };
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition duration-300 ease-in-out",
      isScrolled 
        ? "bg-white dark:bg-[#121e33] shadow-md" 
        : "bg-white/90 dark:bg-[#121e33]/90"
    )}>
      <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <button onClick={onHomeClick} className="flex items-center">
            <GiMirrorMirror className="text-accent mr-2" />
            <span className="text-2xl font-bold playfair tracking-wider">AGILERA</span>
          </button>
        </div>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center text-primary dark:text-white"
          aria-label={t('accessibility.toggleMenu')}
        >
          <FaBars className="text-xl" />
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={onHomeClick}
            className="text-primary dark:text-white hover:text-accent dark:hover:text-accent transition duration-300 ease-in-out"
          >
            {t('nav.home')}
          </button>
          
          <button 
            onClick={onAboutClick}
            className="text-primary dark:text-white hover:text-accent dark:hover:text-accent transition duration-300 ease-in-out"
          >
            {t('nav.about')}
          </button>
          
          <div className="relative group">
            <button 
              onClick={onServicesClick}
              className="flex items-center text-primary dark:text-white hover:text-accent dark:hover:text-accent transition duration-300 ease-in-out"
            >
              {t('nav.services')} <FaChevronDown className="ml-1 text-xs" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-[#1a2536] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 ease-in-out">
              <button 
                onClick={() => scrollToServiceSection('services-haircut')}
                className="block px-4 py-2 text-sm text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700 w-full text-left"
              >
                {t('services.haircut')}
              </button>
              <button 
                onClick={() => scrollToServiceSection('services-styling')}
                className="block px-4 py-2 text-sm text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700 w-full text-left"
              >
                {t('services.styling')}
              </button>
              <button 
                onClick={() => scrollToServiceSection('services-coloring')}
                className="block px-4 py-2 text-sm text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700 w-full text-left"
              >
                {t('services.coloring')}
              </button>
            </div>
          </div>
          
          <button 
            onClick={onGalleryClick}
            className="text-primary dark:text-white hover:text-accent dark:hover:text-accent transition duration-300 ease-in-out"
          >
            {t('nav.gallery')}
          </button>
          
          <button 
            onClick={onContactClick}
            className="text-primary dark:text-white hover:text-accent dark:hover:text-accent transition duration-300 ease-in-out"
          >
            {t('nav.contact')}
          </button>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-[#1a2536] shadow-md">
          <button 
            onClick={() => handleLinkClick(onHomeClick)}
            className="block w-full text-left px-3 py-2 text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700 rounded-md"
          >
            {t('nav.home')}
          </button>
          
          <button 
            onClick={() => handleLinkClick(onAboutClick)}
            className="block w-full text-left px-3 py-2 text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700 rounded-md"
          >
            {t('nav.about')}
          </button>
          
          <button 
            onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
            className="flex justify-between items-center w-full px-3 py-2 text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700 rounded-md"
          >
            {t('nav.services')} <FaChevronDown className="text-xs" />
          </button>
          
          <div className={`pl-4 ${isServicesDropdownOpen ? 'block' : 'hidden'}`}>
            <button 
              onClick={() => scrollToServiceSection('services-haircut')}
              className="block w-full text-left px-3 py-2 text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700 rounded-md"
            >
              {t('services.haircut')}
            </button>
            <button 
              onClick={() => scrollToServiceSection('services-styling')}
              className="block w-full text-left px-3 py-2 text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700 rounded-md"
            >
              {t('services.styling')}
            </button>
            <button 
              onClick={() => scrollToServiceSection('services-coloring')}
              className="block w-full text-left px-3 py-2 text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700 rounded-md"
            >
              {t('services.coloring')}
            </button>
          </div>
          
          <button 
            onClick={() => handleLinkClick(onGalleryClick)}
            className="block w-full text-left px-3 py-2 text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700 rounded-md"
          >
            {t('nav.gallery')}
          </button>
          
          <button 
            onClick={() => handleLinkClick(onContactClick)}
            className="block w-full text-left px-3 py-2 text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700 rounded-md"
          >
            {t('nav.contact')}
          </button>
          
          <div className="flex items-center justify-between px-3 py-2">
            <LanguageSelector isMobile={true} />
            <ThemeToggle isMobile={true} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
