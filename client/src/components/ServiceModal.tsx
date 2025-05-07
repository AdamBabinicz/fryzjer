import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { useServiceModal } from '@/context/ServiceContext';

const ServiceModal = () => {
  const { t } = useTranslation();
  const { isServiceModalOpen, serviceData, closeServiceModal } = useServiceModal();
  
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isServiceModalOpen) {
        closeServiceModal();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isServiceModalOpen, closeServiceModal]);
  
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isServiceModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isServiceModalOpen]);
  
  // Scroll to contact section when "Book Appointment" is clicked
  const handleBookAppointment = () => {
    closeServiceModal();
    
    // Small delay to ensure modal closes first
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        window.scrollTo({
          top: contactSection.offsetTop - 80,
          behavior: 'smooth',
        });
      }
    }, 300);
  };
  
  return (
    <AnimatePresence>
      {isServiceModalOpen && serviceData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
          onClick={closeServiceModal}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white dark:bg-[#1e1e1e] rounded-lg max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeServiceModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-accent text-xl transition duration-300 ease-in-out"
              aria-label={t('accessibility.closeModal')}
            >
              <FaTimes />
            </button>
            <div className="p-8">
              <h3 className="text-2xl font-bold playfair mb-4">{serviceData.title}</h3>
              <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: serviceData.fullDescription }} />
              <div className="mt-8 flex justify-between items-center">
                <span className="text-accent font-bold text-xl">{serviceData.price}</span>
                <button 
                  onClick={handleBookAppointment}
                  className="px-6 py-2 bg-accent text-white font-medium hover:bg-opacity-90 transition duration-300 ease-in-out"
                >
                  {t('services.bookAppointment')}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
