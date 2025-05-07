import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-16 px-4 bg-white dark:bg-[#121212]">
      <Helmet>
        <title>{t('privacyPolicy.pageTitle')} - AGILERA</title>
        <meta name="description" content={t('privacyPolicy.pageDescription')} />
      </Helmet>
      
      <div className="container mx-auto max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold playfair mb-6 text-center"
        >
          {t('privacyPolicy.title')}
        </motion.h1>
        
        <div className="prose dark:prose-invert prose-base max-w-none">
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
            {t('privacyPolicy.lastUpdated')}: 07.05.2023
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-primary dark:text-accent">
            {t('privacyPolicy.section1.title')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-3 text-base">
            {t('privacyPolicy.section1.content')}
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-primary dark:text-accent">
            {t('privacyPolicy.section2.title')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-3 text-base">
            {t('privacyPolicy.section2.content')}
          </p>

          <h3 className="text-lg font-semibold mt-4 mb-2 text-primary dark:text-accent">
            {t('privacyPolicy.section2.subsection1.title')}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3 text-base">
            {t('privacyPolicy.section2.subsection1.content')}
          </p>

          <h3 className="text-lg font-semibold mt-4 mb-2 text-primary dark:text-accent">
            {t('privacyPolicy.section2.subsection2.title')}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3 text-base">
            {t('privacyPolicy.section2.subsection2.content')}
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-primary dark:text-accent">
            {t('privacyPolicy.section3.title')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-3 text-base">
            {t('privacyPolicy.section3.content')}
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-primary dark:text-accent">
            {t('privacyPolicy.section4.title')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-3 text-base">
            {t('privacyPolicy.section4.content')}
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-primary dark:text-accent">
            {t('privacyPolicy.section5.title')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-3 text-base">
            {t('privacyPolicy.section5.content')}
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-primary dark:text-accent">
            {t('privacyPolicy.contact.title')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-3 text-base">
            {t('privacyPolicy.contact.content')}
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 text-sm">
            <li className="mb-2">{t('contact.address')}: ul. Przykładowa 123, 00-001 Warszawa</li>
            <li className="mb-2">{t('contact.email')}: kontakt@agilera.pl</li>
            <li className="mb-2">{t('contact.phone')}: +48 123 456 789</li>
          </ul>
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="/"
            className="inline-block px-6 py-3 bg-accent text-white font-medium hover:bg-opacity-90 transition duration-300 ease-in-out"
          >
            {t('common.backToHome')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;