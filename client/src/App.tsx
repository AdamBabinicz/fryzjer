import React, { useRef, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Switch, Route, useLocation, Link as WouterLink } from "wouter";
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
import { useLanguage } from "@/context/LanguageContext"; // Zakładam, że to nadal używane do <html lang>
import { ServiceProvider } from "@/context/ServiceContext";
import ScrollToTop from "@/components/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
import { SchemaOrg } from "./components/SchemaOrg";
import {
  PAGE_KEYS,
  getLocalizedSlug,
  getCanonicalKeyFromSlug,
  PageKey,
  localizedSlugs,
} from "@/config/slugs";

const NAVBAR_HEIGHT = 80;

function App() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [locationPath, setLocation] = useLocation();
  const previousLangRef = useRef(currentLang);

  const homeRef = useRef<HTMLDivElement>(null); // Ref dla sekcji Home
  // Refy dla innych sekcji, jeśli są potrzebne do bezpośredniego przewijania z App
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSectionByCanonicalId = useCallback(
    (
      canonicalId: PageKey,
      behavior: ScrollBehavior = "smooth",
      updateHashLang: string | null = currentLang
    ) => {
      const elementToScroll = document.getElementById(canonicalId);
      const localizedHashForURL =
        updateHashLang && canonicalId !== PAGE_KEYS.HOME
          ? getLocalizedSlug(canonicalId, updateHashLang)
          : null;

      if (canonicalId === PAGE_KEYS.HOME) {
        window.scrollTo({ top: 0, behavior });
        if (updateHashLang && window.location.pathname === "/") {
          history.replaceState(
            null,
            "",
            `/${getLocalizedSlug(PAGE_KEYS.HOME, updateHashLang)}`
          );
        }
      } else if (elementToScroll) {
        const topPos = elementToScroll.offsetTop - NAVBAR_HEIGHT;
        window.scrollTo({ top: topPos, behavior });
        if (localizedHashForURL && window.location.pathname === "/") {
          history.replaceState(null, "", `#${localizedHashForURL}`);
        } else if (localizedHashForURL && window.location.pathname !== "/") {
          // Jeśli jesteśmy na innej stronie, a chcemy tylko zaktualizować hash po przewinięciu (rzadki przypadek)
          // history.replaceState(null, "", `${window.location.pathname}#${localizedHashForURL}`);
        }
      } else {
        console.warn("Scroll target for canonical ID not found:", canonicalId);
      }
    },
    [currentLang]
  );

  useEffect(() => {
    const previousLang = previousLangRef.current;
    if (previousLang !== currentLang) {
      const pathSegments = locationPath.substring(1).split("#");
      const currentBaseSlug = pathSegments[0] || "";
      const currentHashSlug = pathSegments[1] || "";

      let canonicalPageKey: PageKey | undefined;
      if (currentBaseSlug === "" && !currentHashSlug) {
        canonicalPageKey = PAGE_KEYS.HOME;
      } else {
        canonicalPageKey = getCanonicalKeyFromSlug(
          currentBaseSlug,
          previousLang
        );
      }

      if (canonicalPageKey) {
        const newLocalizedBaseSlug = getLocalizedSlug(
          canonicalPageKey,
          currentLang
        );
        let newPath = newLocalizedBaseSlug ? `/${newLocalizedBaseSlug}` : "/";

        if (currentHashSlug) {
          const canonicalHashKey = getCanonicalKeyFromSlug(
            currentHashSlug,
            previousLang
          );
          if (canonicalHashKey) {
            const newLocalizedHash = getLocalizedSlug(
              canonicalHashKey,
              currentLang
            );
            if (newLocalizedHash) {
              newPath += `#${newLocalizedHash}`;
            }
          } else {
            // Jeśli hash nie jest zlokalizowany, próbujemy go zachować
            // To może wymagać bardziej zaawansowanej logiki jeśli hash też jest dynamiczny
            newPath += `#${currentHashSlug}`;
          }
        }
        if (newPath !== locationPath) {
          setLocation(newPath, { replace: true });
        }
      }
      previousLangRef.current = currentLang;
    }
  }, [currentLang, locationPath, setLocation]);

  useEffect(() => {
    if (locationPath === "/" && window.location.hash) {
      const localizedHashValue = window.location.hash.substring(1);
      const canonicalKey = getCanonicalKeyFromSlug(
        localizedHashValue,
        currentLang
      );

      if (canonicalKey) {
        const attemptScroll = (attempt = 0) => {
          const element = document.getElementById(canonicalKey);
          if (element) {
            scrollToSectionByCanonicalId(canonicalKey, "auto", null);
          } else if (attempt < 15) {
            setTimeout(() => attemptScroll(attempt + 1), 150); // Zwiększone opóźnienie
          } else {
            console.warn(
              `App.tsx: Element for canonical key '${canonicalKey}' (from hash '${localizedHashValue}') not found.`
            );
          }
        };
        const timer = setTimeout(attemptScroll, 150); // Zwiększone opóźnienie
        return () => clearTimeout(timer);
      } else {
        console.warn(
          `App.tsx: No canonical key for localized hash '${localizedHashValue}' in lang '${currentLang}'.`
        );
      }
    }
  }, [locationPath, currentLang, scrollToSectionByCanonicalId]);

  const MainContent = () => (
    <>
      <Home
        ref={homeRef}
        onContactClick={() => scrollToSectionByCanonicalId(PAGE_KEYS.CONTACT)}
      />
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
          <html lang={currentLang} /> {/* Używamy currentLang z i18n */}
          <title>{t("meta.title")}</title>
        </Helmet>
        <SchemaOrg />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-accent focus:text-white focus:z-50"
          aria-label={t("accessibility.skipToContent")}
        ></a>
        <Navbar
          onHomeClick={() => scrollToSectionByCanonicalId(PAGE_KEYS.HOME)}
          onAboutClick={() => scrollToSectionByCanonicalId(PAGE_KEYS.ABOUT)}
          onServicesClick={() =>
            scrollToSectionByCanonicalId(PAGE_KEYS.SERVICES)
          }
          onGalleryClick={() => scrollToSectionByCanonicalId(PAGE_KEYS.GALLERY)}
          onContactClick={() => scrollToSectionByCanonicalId(PAGE_KEYS.CONTACT)}
          onHaircutClick={() =>
            scrollToSectionByCanonicalId(PAGE_KEYS.SERVICES_HAIRCUT)
          }
          onStylingClick={() =>
            scrollToSectionByCanonicalId(PAGE_KEYS.SERVICES_STYLING)
          }
          onColoringClick={() =>
            scrollToSectionByCanonicalId(PAGE_KEYS.SERVICES_COLORING)
          }
        />
        <main id="main-content">
          <Switch>
            <Route
              path={`/${getLocalizedSlug(PAGE_KEYS.HOME, "en")}`}
              component={MainContent}
            />
            <Route
              path={`/${getLocalizedSlug(PAGE_KEYS.HOME, "pl")}`}
              component={MainContent}
            />
            <Route path="/" component={MainContent} />{" "}
            {/* Fallback dla strony głównej */}
            <Route
              path={`/${getLocalizedSlug(PAGE_KEYS.PRIVACY_POLICY, "en")}`}
              component={PrivacyPolicy}
            />
            <Route
              path={`/${getLocalizedSlug(PAGE_KEYS.PRIVACY_POLICY, "pl")}`}
              component={PrivacyPolicy}
            />
            <Route
              path={`/${getLocalizedSlug(PAGE_KEYS.TERMS, "en")}`}
              component={Terms}
            />
            <Route
              path={`/${getLocalizedSlug(PAGE_KEYS.TERMS, "pl")}`}
              component={Terms}
            />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer
          onHomeClick={() => scrollToSectionByCanonicalId(PAGE_KEYS.HOME)}
          onAboutClick={() => scrollToSectionByCanonicalId(PAGE_KEYS.ABOUT)}
          onServicesClick={() =>
            scrollToSectionByCanonicalId(PAGE_KEYS.SERVICES)
          }
          onGalleryClick={() => scrollToSectionByCanonicalId(PAGE_KEYS.GALLERY)}
          onContactClick={() => scrollToSectionByCanonicalId(PAGE_KEYS.CONTACT)}
        />
        <GalleryModal />
        <ServiceModal />
        <ScrollToTop />
      </HelmetProvider>
    </ServiceProvider>
  );
}

export default App;
