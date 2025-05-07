import { forwardRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { teamData as teamDataPL } from '@/data/teamData';
import { teamData as teamDataEN } from '@/data/teamDataEn';

const About = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const { t, i18n } = useTranslation();
  
  // Use appropriate team data based on current language
  const teamMembers = useMemo(() => {
    return i18n.language === 'en' ? teamDataEN : teamDataPL;
  }, [i18n.language]);
  
  // Add TypeScript type annotations for team members
  type TeamMember = {
    name: string;
    position: string;
    image: string;
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <section ref={ref} id="about" className="py-20 bg-white dark:bg-[#121212]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold playfair mb-4"
          >
            {t('about.title')}
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-accent mx-auto"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold playfair mb-6">{t('about.ourStory')}</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('about.storyParagraph1')}
            </p>
            <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('about.storyParagraph2')}
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="border border-accent p-4 text-center">
                <p className="text-3xl font-bold text-accent mb-1">13+</p>
                <p className="text-gray-600 dark:text-gray-400">{t('about.yearsExperience')}</p>
              </div>
              <div className="border border-accent p-4 text-center">
                <p className="text-3xl font-bold text-accent mb-1">5000+</p>
                <p className="text-gray-600 dark:text-gray-400">{t('about.happyClients')}</p>
              </div>
              <div className="border border-accent p-4 text-center">
                <p className="text-3xl font-bold text-accent mb-1">15</p>
                <p className="text-gray-600 dark:text-gray-400">{t('about.industryAwards')}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <img 
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" 
              alt={t('about.stylistWorkingImage')} 
              className="w-full h-auto object-cover rounded-md shadow-lg"
              loading="lazy"
            />
            <img 
              src="https://images.unsplash.com/photo-1470259078422-826894b933aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" 
              alt={t('about.salonInteriorImage')} 
              className="w-full h-auto object-cover rounded-md shadow-lg mt-8"
              loading="lazy"
            />
          </motion.div>
        </div>
        
        <div className="mt-20">
          <h3 className="text-2xl font-bold playfair mb-8 text-center">{t('about.ourTeam')}</h3>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member: TeamMember, index: number) => (
              <motion.div 
                key={`team-member-${index}`}
                variants={itemVariants}
                className="text-center"
              >
                <img 
                  src={member.image} 
                  alt={`${member.name} - ${member.position}`} 
                  className="w-full h-64 object-cover object-top rounded-md shadow-md mb-4"
                  loading="lazy"
                />
                <h4 className="text-xl font-semibold playfair">{member.name}</h4>
                <p className="text-accent">{member.position}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
