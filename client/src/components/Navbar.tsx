import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import { FaBars, FaChevronDown } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { useLocation, Link } from "wouter";
import { PAGE_KEYS, getLocalizedSlug } from "@/config/slugs";

interface NavbarProps {
  onHomeClick: () => void;
  onAboutClick: () => void;
  onServicesClick: () => void;
  onGalleryClick: () => void;
  onContactClick: () => void;
  onHaircutClick: () => void;
  onStylingClick: () => void;
  onColoringClick: () => void;
}

const Navbar = ({
  onHomeClick,
  onAboutClick,
  onServicesClick,
  onGalleryClick,
  onContactClick,
  onHaircutClick,
  onStylingClick,
  onColoringClick,
}: NavbarProps) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isDesktopServicesDropdownOpen, setIsDesktopServicesDropdownOpen] =
    useState(false);
  const [locationPath] = useLocation();
  const isHomePage =
    locationPath === "/" ||
    locationPath === `/${getLocalizedSlug(PAGE_KEYS.HOME, currentLang)}`;

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
  };

  useEffect(() => {
    closeMobileMenu();
    setIsDesktopServicesDropdownOpen(false);
  }, [currentLang, theme, locationPath]); // Dodano currentLang do zależności

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkBaseClasses =
    "text-primary dark:text-[#d6f4ff] hover:text-accent dark:hover:text-accent transition duration-300 ease-in-out";
  const mobileNavLinkBaseClasses =
    "block w-full text-left px-3 py-2 text-primary dark:text-white hover:bg-neutral dark:hover:bg-gray-700 rounded-md";
  const flexAlignCenterClasses = "flex items-center";
  const desktopSubMenuLinkClasses =
    "block w-full text-left px-4 py-2 text-sm text-primary dark:text-white hover:bg-gray-100 dark:hover:bg-[hsl(40,35%,35%)] hover:text-accent dark:hover:text-amber-300";

  const handleMobileLinkClick = (scrollFunc: () => void) => {
    scrollFunc();
    closeMobileMenu();
  };

  const handleMobileServicesClick = () => {
    if (isServicesDropdownOpen) {
      if (isHomePage) {
        onServicesClick();
        closeMobileMenu();
      } else {
        // Nawigacja do strony głównej z hashem do sekcji usług
        const homeSlug = getLocalizedSlug(PAGE_KEYS.HOME, currentLang);
        const servicesSlug = getLocalizedSlug(PAGE_KEYS.SERVICES, currentLang);
        const targetPath = homeSlug
          ? `/${homeSlug}#${servicesSlug}`
          : `/#${servicesSlug}`;

        const link = document.createElement("a");
        link.href = targetPath;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        closeMobileMenu();
      }
    } else {
      setIsServicesDropdownOpen(true);
    }
  };

  const handleDesktopServicesClick = () => {
    if (isDesktopServicesDropdownOpen) {
      if (isHomePage) {
        onServicesClick();
      }
      setIsDesktopServicesDropdownOpen(false);
    } else {
      setIsDesktopServicesDropdownOpen(true);
    }
  };

  const closeDesktopDropdown = () => {
    setIsDesktopServicesDropdownOpen(false);
  };

  const homePageLink = `/${getLocalizedSlug(PAGE_KEYS.HOME, currentLang)}`;

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
        <div className="flex items-center">
          {isHomePage ? (
            <button onClick={onHomeClick} className={flexAlignCenterClasses}>
              <img
                src={
                  theme === "dark"
                    ? "/attached_assets/g-j.avif"
                    : "/attached_assets/g.avif"
                }
                alt="Logo"
                className="h-8 mr-2"
              />
              <span className="text-2xl font-bold playfair tracking-wider flex items-center text-primary dark:text-[#d6f4ff]">
                <img
                  src={
                    theme === "dark"
                      ? "/attached_assets/a-j.avif"
                      : "/attached_assets/a.avif"
                  }
                  alt="A"
                  className="h-7 inline"
                />
                GILERA
              </span>
            </button>
          ) : (
            <Link href={homePageLink} className={flexAlignCenterClasses}>
              <img
                src={
                  theme === "dark"
                    ? "/attached_assets/g-j.avif"
                    : "/attached_assets/g.avif"
                }
                alt="Logo"
                className="h-8 mr-2"
              />
              <span className="text-2xl font-bold playfair tracking-wider flex items-center text-primary dark:text-[#d6f4ff]">
                <img
                  src={
                    theme === "dark"
                      ? "/attached_assets/a-j.avif"
                      : "/attached_assets/a.avif"
                  }
                  alt="A"
                  className="h-7 inline"
                />
                GILERA
              </span>
            </Link>
          )}
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center text-primary dark:text-[#d6f4ff]"
          aria-label={t("accessibility.toggleMenu")}
        >
          <FaBars className="text-xl" />
        </button>
        <div className="hidden md:flex items-center space-x-8">
          {isHomePage ? (
            <button onClick={onHomeClick} className={navLinkBaseClasses}>
              {t("nav.home")}
            </button>
          ) : (
            <Link href={homePageLink} className={navLinkBaseClasses}>
              {t("nav.home")}
            </Link>
          )}
          {isHomePage ? (
            <button onClick={onAboutClick} className={navLinkBaseClasses}>
              {t("nav.about")}
            </button>
          ) : (
            <Link
              href={`${homePageLink}#${getLocalizedSlug(
                PAGE_KEYS.ABOUT,
                currentLang
              )}`}
              className={navLinkBaseClasses}
            >
              {t("nav.about")}
            </Link>
          )}
          <div className="relative">
            <button
              onClick={handleDesktopServicesClick}
              className={cn(navLinkBaseClasses, flexAlignCenterClasses)}
            >
              {t("nav.services")}
              <FaChevronDown
                className={cn(
                  "ml-1 h-3 w-3 transition-transform duration-300",
                  isDesktopServicesDropdownOpen ? "rotate-180" : "rotate-0"
                )}
              />
            </button>
            <div
              className={cn(
                "absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-[hsl(40,35%,30%)] ring-1 ring-black dark:ring-amber-500 ring-opacity-5 focus:outline-none py-1 z-20",
                "overflow-hidden transition-all duration-300 ease-in-out",
                isDesktopServicesDropdownOpen
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              )}
              style={{
                pointerEvents: isDesktopServicesDropdownOpen ? "auto" : "none",
              }}
            >
              {isHomePage ? (
                <button
                  onClick={() => {
                    onHaircutClick();
                    closeDesktopDropdown();
                  }}
                  className={desktopSubMenuLinkClasses}
                >
                  {t("services.haircut")}
                </button>
              ) : (
                <Link
                  href={`${homePageLink}#${getLocalizedSlug(
                    PAGE_KEYS.SERVICES_HAIRCUT,
                    currentLang
                  )}`}
                  onClick={closeDesktopDropdown}
                  className={desktopSubMenuLinkClasses}
                >
                  {t("services.haircut")}
                </Link>
              )}
              {isHomePage ? (
                <button
                  onClick={() => {
                    onStylingClick();
                    closeDesktopDropdown();
                  }}
                  className={desktopSubMenuLinkClasses}
                >
                  {t("services.styling")}
                </button>
              ) : (
                <Link
                  href={`${homePageLink}#${getLocalizedSlug(
                    PAGE_KEYS.SERVICES_STYLING,
                    currentLang
                  )}`}
                  onClick={closeDesktopDropdown}
                  className={desktopSubMenuLinkClasses}
                >
                  {t("services.styling")}
                </Link>
              )}
              {isHomePage ? (
                <button
                  onClick={() => {
                    onColoringClick();
                    closeDesktopDropdown();
                  }}
                  className={desktopSubMenuLinkClasses}
                >
                  {t("services.coloring")}
                </button>
              ) : (
                <Link
                  href={`${homePageLink}#${getLocalizedSlug(
                    PAGE_KEYS.SERVICES_COLORING,
                    currentLang
                  )}`}
                  onClick={closeDesktopDropdown}
                  className={desktopSubMenuLinkClasses}
                >
                  {t("services.coloring")}
                </Link>
              )}
            </div>
          </div>
          {isHomePage ? (
            <button onClick={onGalleryClick} className={navLinkBaseClasses}>
              {t("nav.gallery")}
            </button>
          ) : (
            <Link
              href={`${homePageLink}#${getLocalizedSlug(
                PAGE_KEYS.GALLERY,
                currentLang
              )}`}
              className={navLinkBaseClasses}
            >
              {t("nav.gallery")}
            </Link>
          )}
          {isHomePage ? (
            <button onClick={onContactClick} className={navLinkBaseClasses}>
              {t("nav.contact")}
            </button>
          ) : (
            <Link
              href={`${homePageLink}#${getLocalizedSlug(
                PAGE_KEYS.CONTACT,
                currentLang
              )}`}
              className={navLinkBaseClasses}
            >
              {t("nav.contact")}
            </Link>
          )}
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </nav>
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-500 ease-in-out",
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
        style={{ pointerEvents: isMobileMenuOpen ? "auto" : "none" }}
      >
        <div className="px-2 pt-2 pb-20 space-y-1 bg-white dark:bg-[#253754] shadow-md">
          {isHomePage ? (
            <button
              onClick={() => handleMobileLinkClick(onHomeClick)}
              className={mobileNavLinkBaseClasses}
            >
              {t("nav.home")}
            </button>
          ) : (
            <Link
              href={homePageLink}
              onClick={closeMobileMenu}
              className={mobileNavLinkBaseClasses}
            >
              {t("nav.home")}
            </Link>
          )}
          {isHomePage ? (
            <button
              onClick={() => handleMobileLinkClick(onAboutClick)}
              className={mobileNavLinkBaseClasses}
            >
              {t("nav.about")}
            </button>
          ) : (
            <Link
              href={`${homePageLink}#${getLocalizedSlug(
                PAGE_KEYS.ABOUT,
                currentLang
              )}`}
              onClick={closeMobileMenu}
              className={mobileNavLinkBaseClasses}
            >
              {t("nav.about")}
            </Link>
          )}
          <button
            onClick={handleMobileServicesClick}
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
            style={{ pointerEvents: isServicesDropdownOpen ? "auto" : "none" }}
          >
            {isHomePage ? (
              <>
                <button
                  onClick={() => {
                    onHaircutClick();
                    closeMobileMenu();
                  }}
                  className={mobileNavLinkBaseClasses}
                >
                  {t("services.haircut")}
                </button>
                <button
                  onClick={() => {
                    onStylingClick();
                    closeMobileMenu();
                  }}
                  className={mobileNavLinkBaseClasses}
                >
                  {t("services.styling")}
                </button>
                <button
                  onClick={() => {
                    onColoringClick();
                    closeMobileMenu();
                  }}
                  className={mobileNavLinkBaseClasses}
                >
                  {t("services.coloring")}
                </button>
              </>
            ) : (
              <>
                <Link
                  href={`${homePageLink}#${getLocalizedSlug(
                    PAGE_KEYS.SERVICES_HAIRCUT,
                    currentLang
                  )}`}
                  onClick={closeMobileMenu}
                  className={mobileNavLinkBaseClasses}
                >
                  {t("services.haircut")}
                </Link>
                <Link
                  href={`${homePageLink}#${getLocalizedSlug(
                    PAGE_KEYS.SERVICES_STYLING,
                    currentLang
                  )}`}
                  onClick={closeMobileMenu}
                  className={mobileNavLinkBaseClasses}
                >
                  {t("services.styling")}
                </Link>
                <Link
                  href={`${homePageLink}#${getLocalizedSlug(
                    PAGE_KEYS.SERVICES_COLORING,
                    currentLang
                  )}`}
                  onClick={closeMobileMenu}
                  className={mobileNavLinkBaseClasses}
                >
                  {t("services.coloring")}
                </Link>
              </>
            )}
          </div>
          {isHomePage ? (
            <button
              onClick={() => handleMobileLinkClick(onGalleryClick)}
              className={mobileNavLinkBaseClasses}
            >
              {t("nav.gallery")}
            </button>
          ) : (
            <Link
              href={`${homePageLink}#${getLocalizedSlug(
                PAGE_KEYS.GALLERY,
                currentLang
              )}`}
              onClick={closeMobileMenu}
              className={mobileNavLinkBaseClasses}
            >
              {t("nav.gallery")}
            </Link>
          )}
          {isHomePage ? (
            <button
              onClick={() => handleMobileLinkClick(onContactClick)}
              className={mobileNavLinkBaseClasses}
            >
              {t("nav.contact")}
            </button>
          ) : (
            <Link
              href={`${homePageLink}#${getLocalizedSlug(
                PAGE_KEYS.CONTACT,
                currentLang
              )}`}
              onClick={closeMobileMenu}
              className={mobileNavLinkBaseClasses}
            >
              {t("nav.contact")}
            </Link>
          )}
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
