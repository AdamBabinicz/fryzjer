import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import GalleryModal from "@/components/GalleryModal";
import ServiceModal from "@/components/ServiceModal";
import { useLanguage } from "@/context/LanguageContext";

function App() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  // References for scrolling to sections
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80, // Adjust for header height
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{t("meta.title")}</title>
        <meta name="description" content={t("meta.description")} />
        <meta property="og:title" content={t("meta.ogTitle")} />
        <meta property="og:description" content={t("meta.ogDescription")} />
      </Helmet>
      
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-accent focus:text-white focus:z-50">
        {t("accessibility.skipToContent")}
      </a>
      
      <Navbar
        onHomeClick={() => scrollToSection(homeRef)}
        onAboutClick={() => scrollToSection(aboutRef)}
        onServicesClick={() => scrollToSection(servicesRef)}
        onGalleryClick={() => scrollToSection(galleryRef)}
        onContactClick={() => scrollToSection(contactRef)}
      />
      
      <main id="main-content">
        <Home ref={homeRef} onContactClick={() => scrollToSection(contactRef)} />
        <About ref={aboutRef} />
        <Services ref={servicesRef} />
        <Gallery ref={galleryRef} />
        <Contact ref={contactRef} />
      </main>
      
      <Footer 
        onHomeClick={() => scrollToSection(homeRef)}
        onAboutClick={() => scrollToSection(aboutRef)}
        onServicesClick={() => scrollToSection(servicesRef)}
        onGalleryClick={() => scrollToSection(galleryRef)}
        onContactClick={() => scrollToSection(contactRef)}
      />
      
      {/* Modals */}
      <GalleryModal />
      <ServiceModal />
    </>
  );
}

export default App;
