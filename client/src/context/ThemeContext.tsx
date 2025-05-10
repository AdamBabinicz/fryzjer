import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Domyślna wartość dla kontekstu, jeśli jest używany poza Providerem (co nie powinno się zdarzyć z rzucaniem błędu w useTheme)
const defaultContextValue: ThemeContextType = {
  theme: "light", // Można też dać 'light' lub odczytać preferencje jeśli to możliwe globalnie
  toggleTheme: () =>
    console.warn("toggleTheme called outside of ThemeProvider"),
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Funkcja inicjalizująca stan - uruchamia się tylko raz przy tworzeniu stanu
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") as Theme | null;
      if (storedTheme) {
        // console.log("ThemeContext Initializer: Found stored theme:", storedTheme);
        return storedTheme;
      }
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      // console.log("ThemeContext Initializer: Prefers dark:", prefersDark);
      return prefersDark ? "dark" : "light";
    }
    // console.log("ThemeContext Initializer: SSR or no window, defaulting to light");
    return "light"; // Domyślna wartość dla SSR lub gdy `window` nie jest dostępne
  });

  // EFEKT UBOCZNY: Synchronizacja stanu `theme` z DOM (klasa na <html>) i localStorage
  // Ten useEffect uruchamia się po pierwszym renderowaniu ORAZ za każdym razem, gdy stan `theme` się zmieni.
  useEffect(() => {
    // console.log("ThemeContext useEffect[theme]: Current theme is", theme, ". Applying to DOM and localStorage.");
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      // console.log("ThemeContext useEffect[theme]: Added 'dark' class to html");
    } else {
      root.classList.remove("dark");
      // console.log("ThemeContext useEffect[theme]: Removed 'dark' class from html");
    }
    localStorage.setItem("theme", theme);
    // console.log("ThemeContext useEffect[theme]: Set localStorage theme to:", theme);
  }, [theme]); // <-- WAŻNE: Zależność od `theme`

  const toggleTheme = () => {
    // console.log("ThemeContext toggleTheme: Called. Current theme before toggle:", theme);
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      // console.log("ThemeContext toggleTheme (inside setTheme callback): New theme will be:", newTheme);
      return newTheme; // TYLKO zwracamy nowy stan, resztą zajmie się useEffect
    });
  };

  // console.log("ThemeProvider rendering with theme:", theme);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  // Sprawdzenie, czy context nie jest wartością domyślną, co mogłoby wskazywać na brak Providera
  if (context === undefined || context === defaultContextValue) {
    // W praktyce, jeśli defaultContextValue jest różne od undefined, to context nigdy nie będzie undefined
    // ale `context === undefined` jest standardowym sprawdzeniem.
    // Można też zostawić: if (context === undefined)
    throw new Error(
      "useTheme must be used within a ThemeProvider wrapping the component tree."
    );
  }
  return context;
}
