import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { useGalleryModal } from '@/context/GalleryContext';

const GalleryModal = () => {
  const { t } = useTranslation();
  const { isGalleryModalOpen, galleryModalImage, galleryModalAlt, closeGalleryModal } = useGalleryModal();
  
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isGalleryModalOpen) {
        closeGalleryModal();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isGalleryModalOpen, closeGalleryModal]);
  
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isGalleryModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isGalleryModalOpen]);
  
  return (
    <AnimatePresence>
      {isGalleryModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
          onClick={closeGalleryModal}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={closeGalleryModal}
              className="absolute -top-12 right-0 text-white hover:text-accent text-3xl transition duration-300 ease-in-out"
              aria-label={t('accessibility.closeModal')}
            >
              <FaTimes />
            </button>
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={galleryModalImage} 
              alt={galleryModalAlt} 
              className="w-full h-auto max-h-[80vh] object-contain" 
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryModal;
