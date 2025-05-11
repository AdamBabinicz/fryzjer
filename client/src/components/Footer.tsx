import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { getCurrentYear } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

interface FooterProps {
  onHomeClick: () => void;
  onAboutClick: () => void;
  onServicesClick: () => void;
  onGalleryClick: () => void;
  onContactClick: () => void;
}

const Footer = ({
  onHomeClick,
  onAboutClick,
  onServicesClick,
  onGalleryClick,
  onContactClick,
}: FooterProps) => {
  const { t } = useTranslation();
  // const { toast } = useToast(); // Usunięte
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const grzebienSrc = isDark ? "/assets/gr-j.avif" : "/assets/gr.avif";
  const literaASrc = isDark ? "/assets/a-j.avif" : "/assets/a.avif";

  return (
    <footer className="bg-background/95 text-foreground dark:bg-[#1a1a1a] dark:text-white py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <img src={grzebienSrc} alt="Grzebień Logo" className="h-8 mr-2" />
              <img src={literaASrc} alt="A letter" className="h-6 inline" />
              <span className="text-xl font-bold playfair tracking-wider text-primary dark:text-[#d6f4ff]">
                GILERA
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-300 mb-6">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-white hover:text-accent transition duration-300 ease-in-out"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com" // Zastąp prawdziwymi linkami
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-white hover:text-accent transition duration-300 ease-in-out"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://twitter.com" // Zastąp prawdziwymi linkami
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-white hover:text-accent transition duration-300 ease-in-out"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold playfair mb-6">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={onHomeClick}
                  className="text-gray-500 dark:text-gray-300 hover:text-accent transition duration-300 ease-in-out"
                >
                  {t("nav.home")}
                </button>
              </li>
              <li>
                <button
                  onClick={onAboutClick}
                  className="text-gray-500 dark:text-gray-300 hover:text-accent transition duration-300 ease-in-out"
                >
                  {t("nav.about")}
                </button>
              </li>
              <li>
                <button
                  onClick={onServicesClick}
                  className="text-gray-500 dark:text-gray-300 hover:text-accent transition duration-300 ease-in-out"
                >
                  {t("nav.services")}
                </button>
              </li>
              <li>
                <button
                  onClick={onGalleryClick}
                  className="text-gray-500 dark:text-gray-300 hover:text-accent transition duration-300 ease-in-out"
                >
                  {t("nav.gallery")}
                </button>
              </li>
              <li>
                <button
                  onClick={onContactClick}
                  className="text-gray-500 dark:text-gray-300 hover:text-accent transition duration-300 ease-in-out"
                >
                  {t("nav.contact")}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold playfair mb-6">
              {t("footer.openingHours")}
            </h4>
            <ul className="space-y-2 text-gray-500 dark:text-gray-300">
              <li>{t("footer.monday")}: 9:00 - 7:00</li>
              <li>{t("footer.tuesday")}: 9:00 - 17:00</li>
              <li>{t("footer.wednesday")}: 9:00 - 17:00</li>
              <li>{t("footer.thursday")}: 9:00 - 17:00</li>
              <li>{t("footer.friday")}: 9:00 - 17:00</li>
              <li>{t("footer.saturday")}: 9:00 - 14:00</li>
              <li>
                {t("footer.sunday")}: {t("footer.closed")}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-300 text-sm mb-4 md:mb-0">
            2025 - {getCurrentYear()} {t("footer.copyright")}
          </p>
          <div className="flex space-x-4">
            <Link
              href="/privacy-policy"
              className="text-gray-500 dark:text-gray-300 hover:text-accent text-sm transition duration-300 ease-in-out"
            >
              {t("footer.privacyPolicy")}
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 dark:text-gray-300 hover:text-accent text-sm transition duration-300 ease-in-out"
            >
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
