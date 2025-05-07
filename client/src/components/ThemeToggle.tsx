import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from 'react-i18next';

interface ThemeToggleProps {
  isMobile?: boolean;
}

const ThemeToggle = ({ isMobile = false }: ThemeToggleProps) => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  
  console.log("ThemeToggle rendering, current theme:", theme);

  // Create a direct handler that uses document manipulation
  const handleToggleTheme = () => {
    console.log("ThemeToggle: Button clicked, current theme:", theme);
    
    // Manual document class manipulation for immediate visual feedback
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      console.log("ThemeToggle: Manually switched to light mode");
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      console.log("ThemeToggle: Manually switched to dark mode");
    }
    
    // Also call the context toggler to maintain state
    toggleTheme();
  };
  
  return (
    <button 
      onClick={handleToggleTheme}
      className="text-primary dark:text-white hover:text-accent dark:hover:text-accent transition duration-300 ease-in-out"
      aria-label={t('accessibility.toggleTheme')}
    >
      {document.documentElement.classList.contains('dark') ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggle;
