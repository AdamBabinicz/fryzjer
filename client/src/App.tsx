import React, { useRef, useEffect } from "react"; // <-- Dodaj import useEffect
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Switch, Route, useLocation, Link } from "wouter"; // <-- Dodaj import Link
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// Importuj komponenty sekcji, upewnij się, że akceptują ref przez forwardRef
import Home from "@/pages/Home";
import About from "@/pages/About"; // Zakładam, że About, Services itd. używają forwardRef
import Services from "@/pages/Services";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/not-found";
import GalleryModal from "@/components/GalleryModal";
import ServiceModal from "@/components/ServiceModal";
import { useLanguage } from "@/context/LanguageContext";
import { ServiceProvider } from "@/context/ServiceContext";
import ScrollToTop from "@/components/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
import { SchemaOrg } from "./components/SchemaOrg";

function App() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [location] = useLocation(); // Tylko odczyt lokalizacji

  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // --- Funkcja do płynnego przewijania ---
  const scrollToSection = (
    ref: React.RefObject<HTMLDivElement>,
    behavior: ScrollBehavior = "smooth" // Domyślnie smooth
  ) => {
    if (ref?.current) {
      const offset = 80; // Dostosuj offset
      const topPos = ref.current.offsetTop - offset;
      console.log(
        `Scrolling to ref ${
          ref === aboutRef ? "About" : ref === servicesRef ? "Services" : "..."
        } at top: ${topPos}`
      );
      window.scrollTo({ top: topPos, behavior });
    } else {
      console.warn("Scroll target ref is not available.");
      // Fallback - próba przewinięcia do góry jeśli ref jest homeRef lub nieznany
      if (ref === homeRef) {
        window.scrollTo({ top: 0, behavior });
      }
    }
  };

  // --- Logika obsługi hasha po zmianie lokalizacji ---
  useEffect(() => {
    const currentPath = location; // Aktualna ścieżka z wouter
    const hash = window.location.hash; // Hash z natywnego obiektu location

    console.log(`Location changed: Path=${currentPath}, Hash=${hash}`);

    // Sprawdzamy hash TYLKO jeśli jesteśmy na ścieżce głównej '/'
    // i jeśli hash faktycznie istnieje
    if (currentPath === "/" && hash) {
      // Krótkie opóźnienie dla pewności, że DOM jest gotowy
      const timer = setTimeout(() => {
        const id = hash.substring(1);
        console.log(`Processing hash on '/' route: ${id}`);
        let targetRef: React.RefObject<HTMLDivElement> | null = null;

        // Mapowanie ID na Ref
        switch (id) {
          case "about":
            targetRef = aboutRef;
            break;
          case "services":
            targetRef = servicesRef;
            break;
          case "gallery":
            targetRef = galleryRef;
            break;
          case "contact":
            targetRef = contactRef;
            break;
          case "home":
            targetRef = homeRef;
            break; // lub przewiń do 0
          // Obsłuż podsekcje usług, jeśli mają własne ID
          case "services-haircut": // Zakładając, że masz ID 'services-haircut' w komponencie Services
          case "services-styling":
          case "services-coloring":
            targetRef = servicesRef; // Najpierw przewiń do głównej sekcji usług
            // Możesz dodać bardziej precyzyjne przewijanie do pod-ID, jeśli istnieją
            break;
          default:
            console.warn(`No ref mapping found for hash: ${id}`);
        }

        if (targetRef) {
          scrollToSection(targetRef, "auto"); // Użyj 'auto' dla natychmiastowego skoku po załadowaniu
        } else {
          // Opcjonalny fallback na getElementById, jeśli mapowanie refów zawiedzie
          const element = document.getElementById(id);
          if (element) {
            console.log(`Fallback: Scrolling to element ID: ${id}`);
            window.scrollTo({ top: element.offsetTop - 80, behavior: "auto" });
          }
        }
      }, 150); // Zwiększono lekko opóźnienie na wszelki wypadek

      return () => clearTimeout(timer); // Cleanup
    }
  }, [location]); // Uruchom ten efekt, gdy zmieni się `location` z woutera

  // Komponent renderujący główne sekcje
  const MainContent = () => (
    <>
      {/* Upewnij się, że komponenty Home, About itd. przyjmują ref (forwardRef) */}
      <Home ref={homeRef} onContactClick={() => scrollToSection(contactRef)} />
      <About ref={aboutRef} />
      <Services ref={servicesRef} />
      <Gallery ref={galleryRef} />
      <Contact ref={contactRef} />
    </>
  );

  return (
    <ServiceProvider>
      <HelmetProvider>
        <Helmet>
          {/* ... meta tagi ... */}
          <html lang={language} />
          <title>{t("meta.title")}</title>
          <meta name="description" content={t("meta.description")} />
        </Helmet>
        <SchemaOrg />

        <a href="#main-content" className="sr-only ...">
          {" "}
          {/* ... skip link ... */}{" "}
        </a>

        {/* Navbar przekazuje teraz TYLKO funkcje przewijania.
            Logika warunkowa isHomePage/isSpecialPage jest w Navbar.tsx */}
        <Navbar
          onHomeClick={() => scrollToSection(homeRef)}
          onAboutClick={() => scrollToSection(aboutRef)}
          onServicesClick={() => scrollToSection(servicesRef)}
          onGalleryClick={() => scrollToSection(galleryRef)}
          onContactClick={() => scrollToSection(contactRef)}
        />

        <main id="main-content">
          {" "}
          {/* Usunięto klasy Tailwind z main, aby sekcje mogły zajmować całą szerokość */}
          <Switch>
            {/* Główna trasa renderuje MainContent */}
            <Route path="/" component={MainContent} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms" component={Terms} />
            <Route component={NotFound} />
          </Switch>
        </main>

        {/* Footer przekazuje teraz TYLKO funkcje przewijania */}
        <Footer
          onHomeClick={() => scrollToSection(homeRef)}
          onAboutClick={() => scrollToSection(aboutRef)}
          onServicesClick={() => scrollToSection(servicesRef)}
          onGalleryClick={() => scrollToSection(galleryRef)}
          onContactClick={() => scrollToSection(contactRef)}
        />

        <GalleryModal />
        <ServiceModal />
        <ScrollToTop />
      </HelmetProvider>
    </ServiceProvider>
  );
}

export default App;
