import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import { FaBars, FaChevronDown } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocation } from "wouter"; // <--- Importuj hook useLocation

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
  onContactClick,
}: NavbarProps) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [location, setLocation] = useLocation(); // <--- Pobierz bieżącą lokalizację i funkcję do nawigacji

  // Sprawdź, czy jesteśmy na stronie głównej
  const isHomePage = location === "/";

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
  }, [language, theme, location]); // <-- Dodaj location do zależności, aby zamknąć menu przy zmianie trasy

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Funkcja pomocnicza do obsługi kliknięć w linki nawigacyjne
  const handleNavClick = (scrollCallback: () => void, targetHash: string) => {
    if (isHomePage) {
      scrollCallback(); // Jeśli na stronie głównej, przewiń płynnie
    } else {
      setLocation(`/${targetHash}`); // Jeśli na innej stronie, nawiguj do strony głównej z hashem
    }
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
  };

  // Funkcja do przewijania do sekcji usług na stronie głównej
  const scrollToServiceSection = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 100, // Dostosuj offset
          behavior: "smooth",
        });
      }
    } else {
      // Jeśli nie na stronie głównej, nawiguj do strony głównej z hashem sekcji
      setLocation(`/#${sectionId}`);
    }
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false); // Zamknij też dropdown
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition duration-500 ease-in-out",
        isScrolled
          ? "bg-white dark:bg-[#121e33] shadow-md"
          : "bg-white/90 dark:bg-[#121e33]/90"
      )}
    >
      <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">
        {/* Logo - kliknięcie zawsze powinno prowadzić do strony głównej */}
        <div className="flex items-center">
          <button
            onClick={() => handleNavClick(onHomeClick, "")}
            className="flex items-center"
          >
            {/* ... img logo ... */}
            <img
              src={
                theme === "dark"
                  ? "/attached_assets/g-j.avif"
                  : "/attached_assets/g.avif"
              }
              alt="Agilera Salon Logo"
              className="h-8 mr-2"
            />
            <span className="text-2xl font-bold playfair tracking-wider flex items-center text-primary dark:text-[#d6f4ff]">
              <img
                src={
                  theme === "dark"
                    ? "/attached_assets/a-j.avif"
                    : "/attached_assets/a.avif"
                }
                alt="A letter"
                className="h-7 inline"
              />
              GILERA
            </span>
          </button>
        </div>

        {/* Przycisk menu mobilnego */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center text-primary dark:text-[#d6f4ff]"
          aria-label={t("accessibility.toggleMenu")}
        >
          <FaBars className="text-xl" />
        </button>

        {/* Nawigacja desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => handleNavClick(onHomeClick, "")} // Użyj nowej funkcji obsługi
            className="text-primary dark:text-[#d6f4ff] hover:text-accent dark:hover:text-accent transition duration-300 ease-in-out"
          >
            {t("nav.home")}
          </button>
          <button
            onClick={() => handleNavClick(onAboutClick, "#about")} // Użyj nowej funkcji obsługi
            className="text-primary dark:text-[#d6f4ff] hover:text-accent dark:hover:text-accent transition duration-300 ease-in-out"
          >
            {t("nav.about")}
          </button>
          <div className="relative">
            <button
              onClick={() => handleNavClick(onServicesClick, "#services")} // Użyj nowej funkcji obsługi
              className="flex items-center text-primary dark:text-[#d6f4ff] hover:text-accent dark:hover:text-accent transition duration-300 ease-in-out"
            >
              {t("nav.services")}
            </button>
          </div>
          <button
            onClick={() => handleNavClick(onGalleryClick, "#gallery")} // Użyj nowej funkcji obsługi
            className="text-primary dark:text-[#d6f4ff] hover:text-accent dark:hover:text-accent transition duration-300 ease-in-out"
          >
            {t("nav.gallery")}
          </button>
          <button
            onClick={() => handleNavClick(onContactClick, "#contact")} // Użyj nowej funkcji obsługi
            className="text-primary dark:text-[#d6f4ff] hover:text-accent dark:hover:text-accent transition duration-300 ease-in-out"
          >
            {t("nav.contact")}
          </button>
        </div>

        {/* Kontrolki desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </nav>

      {/* Menu mobilne */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-500 ease-in-out",
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
        style={{ pointerEvents: isMobileMenuOpen ? "auto" : "none" }}
      >
        <div className="px-2 pt-2 pb-20 space-y-1 bg-white dark:bg-[#253754] shadow-md">
          <button
            onClick={() => handleNavClick(onHomeClick, "")} // Użyj nowej funkcji obsługi
            className="block w-full text-left px-3 py-2 text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700 rounded-md"
          >
            {t("nav.home")}
          </button>
          <button
            onClick={() => handleNavClick(onAboutClick, "#about")} // Użyj nowej funkcji obsługi
            className="block w-full text-left px-3 py-2 text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700 rounded-md"
          >
            {t("nav.about")}
          </button>

          {/* Dropdown Usługi */}
          <button
            onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
            className="flex justify-between items-center w-full px-3 py-2 text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700 rounded-md"
          >
            {t("nav.services")}
            <FaChevronDown
              className={cn(
                "text-xs transition-transform duration-300",
                isServicesDropdownOpen ? "rotate-180" : "rotate-0"
              )}
            />
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out pl-4",
              isServicesDropdownOpen
                ? "max-h-[200px] opacity-100"
                : "max-h-0 opacity-0"
            )}
          >
            {/* Przyciski podmenu usług teraz używają nowej funkcji scrollToServiceSection */}
            <button
              onClick={() => scrollToServiceSection("services-haircut")}
              className="block w-full text-left px-3 py-2 text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700 rounded-md"
            >
              {t("services.haircut")}
            </button>
            <button
              onClick={() => scrollToServiceSection("services-styling")}
              className="block w-full text-left px-3 py-2 text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700 rounded-md"
            >
              {t("services.styling")}
            </button>
            <button
              onClick={() => scrollToServiceSection("services-coloring")}
              className="block w-full text-left px-3 py-2 text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700 rounded-md"
            >
              {t("services.coloring")}
            </button>
          </div>
          {/* Koniec Dropdown Usługi */}

          <button
            onClick={() => handleNavClick(onGalleryClick, "#gallery")} // Użyj nowej funkcji obsługi
            className="block w-full text-left px-3 py-2 text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700 rounded-md"
          >
            {t("nav.gallery")}
          </button>
          <button
            onClick={() => handleNavClick(onContactClick, "#contact")} // Użyj nowej funkcji obsługi
            className="block w-full text-left px-3 py-2 text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700 rounded-md"
          >
            {t("nav.contact")}
          </button>

          {/* Kontrolki mobilne */}
          <div className="flex items-center justify-between px-3 pt-4">
            <div className="flex-1">
              <LanguageSelector isMobile={true} />
            </div>
            <ThemeToggle isMobile={true} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
