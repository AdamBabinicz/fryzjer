import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import { FaBars, FaChevronDown } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocation, Link } from "wouter"; // <--- Importuj Link obok useLocation

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
  const [location] = useLocation(); // Tylko pobieramy lokalizację

  const isHomePage = location === "/";

  // Funkcja do zamykania menu mobilnego - będzie używana w Linkach
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
  };

  useEffect(() => {
    closeMobileMenu(); // Zamknij menu przy zmianie języka, motywu lub lokalizacji
  }, [language, theme, location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Style dla linków/przycisków ---
  const navLinkBaseClasses =
    "text-primary dark:text-[#d6f4ff] hover:text-accent dark:hover:text-accent transition duration-300 ease-in-out";
  const mobileNavLinkBaseClasses =
    "block w-full text-left px-3 py-2 text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700 rounded-md";
  const flexAlignCenterClasses = "flex items-center"; // Dla spójności dla przycisku Services

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
        {/* Logo - teraz używa Link jeśli nie na home */}
        <div className="flex items-center">
          {isHomePage ? (
            <button onClick={onHomeClick} className={flexAlignCenterClasses}>
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
          ) : (
            <Link href="/" className={flexAlignCenterClasses}>
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
            </Link>
          )}
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
          {/* Home */}
          {isHomePage ? (
            <button onClick={onHomeClick} className={navLinkBaseClasses}>
              {t("nav.home")}
            </button>
          ) : (
            <Link href="/" className={navLinkBaseClasses}>
              {t("nav.home")}
            </Link>
          )}
          {/* About */}
          {isHomePage ? (
            <button onClick={onAboutClick} className={navLinkBaseClasses}>
              {t("nav.about")}
            </button>
          ) : (
            <Link href="/#about" className={navLinkBaseClasses}>
              {t("nav.about")}
            </Link>
          )}
          {/* Services */}
          <div className="relative">
            {isHomePage ? (
              <button
                onClick={onServicesClick}
                className={cn(navLinkBaseClasses, flexAlignCenterClasses)}
              >
                {t("nav.services")}
              </button>
            ) : (
              <Link
                href="/#services"
                className={cn(navLinkBaseClasses, flexAlignCenterClasses)}
              >
                {t("nav.services")}
              </Link>
            )}
          </div>
          {/* Gallery */}
          {isHomePage ? (
            <button onClick={onGalleryClick} className={navLinkBaseClasses}>
              {t("nav.gallery")}
            </button>
          ) : (
            <Link href="/#gallery" className={navLinkBaseClasses}>
              {t("nav.gallery")}
            </Link>
          )}
          {/* Contact */}
          {isHomePage ? (
            <button onClick={onContactClick} className={navLinkBaseClasses}>
              {t("nav.contact")}
            </button>
          ) : (
            <Link href="/#contact" className={navLinkBaseClasses}>
              {t("nav.contact")}
            </Link>
          )}
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
          {/* Home */}
          {isHomePage ? (
            <button
              onClick={() => {
                onHomeClick();
                closeMobileMenu();
              }}
              className={mobileNavLinkBaseClasses}
            >
              {t("nav.home")}
            </button>
          ) : (
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={mobileNavLinkBaseClasses}
            >
              {t("nav.home")}
            </Link>
          )}
          {/* About */}
          {isHomePage ? (
            <button
              onClick={() => {
                onAboutClick();
                closeMobileMenu();
              }}
              className={mobileNavLinkBaseClasses}
            >
              {t("nav.about")}
            </button>
          ) : (
            <Link
              href="/#about"
              onClick={closeMobileMenu}
              className={mobileNavLinkBaseClasses}
            >
              {t("nav.about")}
            </Link>
          )}

          {/* --- Sekcja Usługi Mobile --- */}
          {/* Główny przycisk Services (rozwijanie/przewijanie/nawigacja) */}
          {isHomePage ? (
            <button
              onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)} // Na home tylko rozwija/zwija dropdown
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
          ) : (
            // Na podstronie, przycisk "Services" nawiguje do sekcji #services na stronie głównej
            <Link
              href="/#services"
              onClick={closeMobileMenu}
              className="flex justify-between items-center w-full px-3 py-2 text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700 rounded-md"
            >
              {t("nav.services")}
              {/* Opcjonalnie można usunąć strzałkę, gdy jest to Link */}
              {/* <FaChevronDown className="text-xs" /> */}
            </Link>
          )}

          {/* Dropdown z podkategoriami - widoczny tylko na stronie głównej i gdy otwarty */}
          {isHomePage && (
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out pl-4",
                isServicesDropdownOpen
                  ? "max-h-[200px] opacity-100"
                  : "max-h-0 opacity-0"
              )}
            >
              {/* Te buttony działają tylko na stronie głównej i przewijają */}
              <button
                onClick={() => {
                  onServicesClick();
                  /* Można dodać specyficzne przewijanie */ closeMobileMenu();
                }}
                className={mobileNavLinkBaseClasses}
              >
                {t("services.haircut")}
              </button>
              <button
                onClick={() => {
                  onServicesClick();
                  /* Można dodać specyficzne przewijanie */ closeMobileMenu();
                }}
                className={mobileNavLinkBaseClasses}
              >
                {t("services.styling")}
              </button>
              <button
                onClick={() => {
                  onServicesClick();
                  /* Można dodać specyficzne przewijanie */ closeMobileMenu();
                }}
                className={mobileNavLinkBaseClasses}
              >
                {t("services.coloring")}
              </button>
            </div>
          )}
          {/* --- Koniec Sekcji Usługi Mobile --- */}

          {/* Gallery */}
          {isHomePage ? (
            <button
              onClick={() => {
                onGalleryClick();
                closeMobileMenu();
              }}
              className={mobileNavLinkBaseClasses}
            >
              {t("nav.gallery")}
            </button>
          ) : (
            <Link
              href="/#gallery"
              onClick={closeMobileMenu}
              className={mobileNavLinkBaseClasses}
            >
              {t("nav.gallery")}
            </Link>
          )}
          {/* Contact */}
          {isHomePage ? (
            <button
              onClick={() => {
                onContactClick();
                closeMobileMenu();
              }}
              className={mobileNavLinkBaseClasses}
            >
              {t("nav.contact")}
            </button>
          ) : (
            <Link
              href="/#contact"
              onClick={closeMobileMenu}
              className={mobileNavLinkBaseClasses}
            >
              {t("nav.contact")}
            </Link>
          )}

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
