import React, { useRef, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Switch, Route, useLocation, Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
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
import ScrollToTop from "@/components/ScrollToTop"; // Ten komponent prawdopodobnie używa top: 0
import { HelmetProvider } from "react-helmet-async";
import { SchemaOrg } from "./components/SchemaOrg";

function App() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [location] = useLocation();

  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const refIdMap = useCallback(
    () =>
      new Map<React.RefObject<HTMLDivElement>, string>([
        [homeRef, ""],
        [aboutRef, "about"],
        [servicesRef, "services"],
        [galleryRef, "gallery"],
        [contactRef, "contact"],
      ]),
    []
  );

  const scrollToSection = useCallback(
    (
      ref: React.RefObject<HTMLDivElement>,
      behavior: ScrollBehavior = "smooth"
    ) => {
      const currentRefIdMap = refIdMap();
      const targetId = currentRefIdMap.get(ref); // Pobierz ID od razu

      // --- SPECJALNA OBSŁUGA DLA HOME ---
      if (ref === homeRef) {
        console.log(`Scrolling to TOP (Home)`);
        window.scrollTo({ top: 0, behavior }); // Bezpośrednio do zera

        // Aktualizuj hash (usuń go) jeśli jesteśmy na home page
        if (location === "/") {
          console.log("Replacing state, removing hash for home");
          history.replaceState(null, "", window.location.pathname);
        }
        // --- KONIEC SPECJALNEJ OBSŁUGI DLA HOME ---
      } else if (ref?.current) {
        // Obsługa pozostałych sekcji
        const offset = 80;
        const topPos = ref.current.offsetTop - offset;

        console.log(
          `Scrolling to ref for ID ${targetId ?? "unknown"} at top: ${topPos}`
        );
        window.scrollTo({ top: topPos, behavior });

        // Aktualizuj hash tylko jeśli jesteśmy na stronie głównej ('/')
        if (location === "/") {
          if (targetId !== undefined && targetId !== "") {
            console.log(`Replacing state with hash: #${targetId}`);
            history.replaceState(null, "", `#${targetId}`);
          }
          // Nie potrzebujemy 'else' tutaj, bo przypadek home (pusty hash) jest obsłużony wyżej
        }
      } else {
        console.warn("Scroll target ref is not available for ID:", targetId);
      }
    },
    [location, refIdMap]
  ); // Zależności

  useEffect(() => {
    const currentPath = location;
    const hash = window.location.hash;
    const currentRefIdMap = refIdMap();

    console.log(`Effect: Location=${currentPath}, Hash=${hash}`);

    if (currentPath === "/" && hash) {
      const timer = setTimeout(() => {
        const id = hash.substring(1);
        console.log(`Effect: Processing initial hash: ${id}`);

        let targetRef: React.RefObject<HTMLDivElement> | null = null;
        currentRefIdMap.forEach((refId, ref) => {
          if (refId === id) targetRef = ref;
        });

        if (
          !targetRef &&
          (id === "services-haircut" ||
            id === "services-styling" ||
            id === "services-coloring")
        ) {
          targetRef = servicesRef;
        }

        if (targetRef) {
          // Wywołaj scrollToSection, aby obsłużyć logikę przewijania i *potencjalnie* hash
          // Użyj 'auto', bo to inicjalny skok
          scrollToSection(targetRef, "auto");
        } else {
          const element = document.getElementById(id);
          if (element) {
            console.log(`Effect Fallback: Scrolling to element ID: ${id}`);
            window.scrollTo({ top: element.offsetTop - 80, behavior: "auto" });
          } else {
            console.warn(
              `Effect: Element/Ref for initial hash ${id} not found.`
            );
          }
        }
      }, 150);

      return () => clearTimeout(timer);
    }
    // Zaktualizowano zależności, aby zawierały funkcję scrollToSection
  }, [location, scrollToSection, refIdMap]);

  const MainContent = () => (
    <>
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
        <Helmet> {/* ... meta tagi ... */} </Helmet>
        <SchemaOrg />
        <a href="#main-content" className="sr-only ...">
          {" "}
          {/* ... skip link ... */}{" "}
        </a>

        <Navbar
          onHomeClick={() => scrollToSection(homeRef)}
          onAboutClick={() => scrollToSection(aboutRef)}
          onServicesClick={() => scrollToSection(servicesRef)}
          onGalleryClick={() => scrollToSection(galleryRef)}
          onContactClick={() => scrollToSection(contactRef)}
        />

        <main id="main-content">
          <Switch>
            <Route path="/" component={MainContent} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms" component={Terms} />
            <Route component={NotFound} />
          </Switch>
        </main>

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
        {/* Ten komponent działa poprawnie, bo używa top: 0 */}
      </HelmetProvider>
    </ServiceProvider>
  );
}

export default App;
