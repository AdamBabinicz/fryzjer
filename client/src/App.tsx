import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Switch, Route, useLocation } from "wouter";
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

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const isSpecialPage = location === "/privacy-policy" || location === "/terms";
  const handleHomeClick = () => {
    if (isSpecialPage) {
      window.location.href = "/";
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
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
          <title>{t("meta.title")}</title>
          <meta name="description" content={t("meta.description")} />
          <meta property="og:title" content={t("meta.ogTitle")} />
          <meta property="og:description" content={t("meta.ogDescription")} />
        </Helmet>

        <SchemaOrg />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-accent focus:text-white focus:z-50"
        >
          {t("accessibility.skipToContent")}
        </a>

        <Navbar
          onHomeClick={handleHomeClick}
          onAboutClick={() => {
            if (isSpecialPage) window.location.href = "/#about";
            else scrollToSection(aboutRef);
          }}
          onServicesClick={() => {
            if (isSpecialPage) window.location.href = "/#services";
            else scrollToSection(servicesRef);
          }}
          onGalleryClick={() => {
            if (isSpecialPage) window.location.href = "/#gallery";
            else scrollToSection(galleryRef);
          }}
          onContactClick={() => {
            if (isSpecialPage) window.location.href = "/#contact";
            else scrollToSection(contactRef);
          }}
        />

        <main
          id="main-content"
          className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8"
        >
          <Switch>
            <Route path="/" component={MainContent} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms" component={Terms} />
            <Route component={NotFound} />
          </Switch>
        </main>

        <Footer
          onHomeClick={() => {
            if (isSpecialPage) window.location.href = "/";
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onAboutClick={() => {
            if (isSpecialPage) window.location.href = "/#about";
            else scrollToSection(aboutRef);
          }}
          onServicesClick={() => {
            if (isSpecialPage) window.location.href = "/#services";
            else scrollToSection(servicesRef);
          }}
          onGalleryClick={() => {
            if (isSpecialPage) window.location.href = "/#gallery";
            else scrollToSection(galleryRef);
          }}
          onContactClick={() => {
            if (isSpecialPage) window.location.href = "/#contact";
            else scrollToSection(contactRef);
          }}
        />

        <GalleryModal />
        <ServiceModal />
        <ScrollToTop />
      </HelmetProvider>
    </ServiceProvider>
  );
}

export default App;
