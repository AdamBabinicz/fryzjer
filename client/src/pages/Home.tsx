import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
// Używamy ścieżki z aliasem @assets
import heroImage from '@assets/hero-bg.svg';

interface HomeProps {
  onContactClick: () => void;
}

const Home = forwardRef<HTMLDivElement, HomeProps>(({ onContactClick }, ref) => {
  const { t } = useTranslation();
  
  return (
    <section ref={ref} id="home" className="pt-24 md:pt-32 relative bg-white dark:bg-[#121212]">
      <div className="w-full h-[85vh] relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&h=1100&q=80" 
          alt={t('home.heroAlt')} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary bg-opacity-40 flex flex-col items-center justify-center px-4 text-center">
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
            {t('home.motto')}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a 
              href="#about" 
              className="px-8 py-3 bg-accent text-white font-medium hover:bg-opacity-90 transition duration-300 ease-in-out shadow-lg"
            >
              {t('home.knowUs')}
            </a>
            <button 
              onClick={onContactClick}
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium hover:bg-white hover:bg-opacity-10 transition duration-300 ease-in-out shadow-lg"
            >
              {t('home.bookAppointment')}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

Home.displayName = 'Home';

export default Home;
