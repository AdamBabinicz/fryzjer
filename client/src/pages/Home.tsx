import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import HeroBackground from "../components/HeroBackground";
import { PAGE_KEYS, getLocalizedSlug } from "@/config/slugs"; // Poprawiony import - dodano getLocalizedSlug

interface HomeProps {
  onContactClick: () => void;
}

const Home = forwardRef<HTMLDivElement, HomeProps>(
  ({ onContactClick }, ref) => {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;

    return (
      <section
        ref={ref}
        id={PAGE_KEYS.HOME} // Użyj kanonicznego klucza jako ID
        className="mt-24 md:mt-32 relative bg-white dark:bg-transparent section-home"
      >
        <div className="w-full h-[85vh] relative overflow-hidden">
          <HeroBackground />

          <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col items-center justify-center px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white playfair mb-4"
            >
              AGILERA
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-white playfair tracking-wider mb-8"
            >
              {t("home.motto")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {/* Link do "O nas" - teraz musi być dynamiczny */}
              <a
                href={`#${getLocalizedSlug(PAGE_KEYS.ABOUT, currentLang)}`}
                className="px-8 py-3 bg-accent text-white font-medium hover:bg-opacity-90 transition duration-300 ease-in-out shadow-lg"
              >
                {t("home.knowUs")}
              </a>
              <button
                onClick={onContactClick} // onContactClick przekaże kanoniczny ID do scrollToSectionByCanonicalId
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium hover:bg-white hover:bg-opacity-10 transition duration-300 ease-in-out shadow-lg"
              >
                {t("home.bookAppointment")}
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }
);

Home.displayName = "Home";

export default Home;
