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
import ScrollToTop from "@/components/ScrollToTop";
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
      const targetId = currentRefIdMap.get(ref);
      if (ref === homeRef) {
        window.scrollTo({ top: 0, behavior });
        if (location === "/") {
          history.replaceState(null, "", window.location.pathname);
        }
      } else if (ref?.current) {
        const offset = 80;
        const topPos = ref.current.offsetTop - offset;
        window.scrollTo({ top: topPos, behavior });
        if (location === "/") {
          if (targetId !== undefined && targetId !== "") {
            history.replaceState(null, "", `#${targetId}`);
          }
        }
      } else {
        console.warn("Scroll target ref is not available for ID:", targetId);
      }
    },
    [location, refIdMap]
  );

  const scrollToSubSection = useCallback(
    (id: string, behavior: ScrollBehavior = "smooth") => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const topPos = element.offsetTop - offset;
        window.scrollTo({ top: topPos, behavior });
        if (location === "/") {
          history.replaceState(null, "", `#${id}`);
        }
      } else {
        console.warn(`Sub-section element with ID ${id} not found.`);
        scrollToSection(servicesRef, behavior);
      }
    },
    [location, scrollToSection, servicesRef]
  );

  useEffect(() => {
    const currentPath = location;
    const hash = window.location.hash;
    const currentRefIdMap = refIdMap();

    if (currentPath === "/" && hash) {
      const timer = setTimeout(() => {
        const id = hash.substring(1);
        let targetRef: React.RefObject<HTMLDivElement> | null = null;
        currentRefIdMap.forEach((refId, ref) => {
          if (refId === id) targetRef = ref;
        });

        const isSubService =
          id === "services-haircut" ||
          id === "services-styling" ||
          id === "services-coloring";

        if (!targetRef && isSubService) {
          scrollToSubSection(id, "auto"); // Przewiń do podsekcji
        } else if (targetRef) {
          scrollToSection(targetRef, "auto");
        } else {
          const element = document.getElementById(id);
          if (element) {
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
  }, [location, scrollToSection, scrollToSubSection, refIdMap]);

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
        <Helmet>
          <html lang={language} />
          <title>{t("meta.title")}</title>{" "}
        </Helmet>
        <SchemaOrg />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-accent focus:text-white focus:z-50"
          aria-label={t("accessibility.skipToContent")}
        ></a>
        <Navbar
          onHomeClick={() => scrollToSection(homeRef)}
          onAboutClick={() => scrollToSection(aboutRef)}
          onServicesClick={() => scrollToSection(servicesRef)}
          onGalleryClick={() => scrollToSection(galleryRef)}
          onContactClick={() => scrollToSection(contactRef)}
          onHaircutClick={() => scrollToSubSection("services-haircut")}
          onStylingClick={() => scrollToSubSection("services-styling")}
          onColoringClick={() => scrollToSubSection("services-coloring")}
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
      </HelmetProvider>
    </ServiceProvider>
  );
}

export default App;
