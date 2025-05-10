import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";

interface ThemeToggleProps {
  // PRZYWRÓCONY INTERFEJS PROPSÓW
  isMobile?: boolean;
}

const ThemeToggle = ({ isMobile = false }: ThemeToggleProps) => {
  // UŻYCIE PROPSA
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  // console.log("ThemeToggle rendering, theme from context:", theme, "isMobile:", isMobile);

  // Tutaj możesz użyć `isMobile` do warunkowego stylowania lub logiki, np.:
  const iconSize = isMobile ? 18 : 20;
  // const buttonPadding = isMobile ? "p-1" : "p-2";

  return (
    <button
      onClick={toggleTheme}
      // className={`rounded-md text-primary dark:text-white hover:text-accent dark:hover:text-accent transition duration-300 ease-in-out ${buttonPadding}`} // Przykład użycia
      className="p-2 rounded-md text-primary dark:text-white hover:text-accent dark:hover:text-accent transition duration-300 ease-in-out"
      aria-label={t("accessibility.toggleTheme")}
    >
      {theme === "dark" ? (
        <FaSun size={iconSize} />
      ) : (
        <FaMoon size={iconSize} />
      )}
    </button>
  );
};

export default ThemeToggle;
