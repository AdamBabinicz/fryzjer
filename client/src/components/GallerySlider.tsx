import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useGalleryModal } from '@/context/GalleryContext';
import { galleryData } from '@/data/galleryData';

const GallerySlider = () => {
  const { t } = useTranslation();
  const { openGalleryModal } = useGalleryModal();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const totalSlides = galleryData.length;

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);
  
  const goToSlide = (slideIndex: number) => {
    let newIndex = slideIndex;
    if (newIndex < 0) newIndex = totalSlides - 1;
    if (newIndex >= totalSlides) newIndex = 0;
    
    setCurrentSlide(newIndex);
  };
  
  const goToPrevSlide = () => {
    goToSlide(currentSlide - 1);
  };
  
  const goToNextSlide = () => {
    goToSlide(currentSlide + 1);
  };
  
  // Touch handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      goToNextSlide();
    }
    
    if (touchStart - touchEnd < -50) {
      // Swipe right
      goToPrevSlide();
    }
  };
  
  // Handle image click to open modal
  const handleImageClick = (slide: number, imageIndex: number) => {
    const gallerySlide = galleryData[slide];
    if (gallerySlide) {
      const imageData = gallerySlide.images[imageIndex];
      if (imageData) {
        openGalleryModal(imageData.fullSrc, imageData.alt);
      }
    }
  };
  
  return (
    <div className="relative">
      <div 
        ref={sliderRef}
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="px-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryData[currentSlide]?.images.map((image, index) => (
                <div 
                  key={`image-${index}`}
                  className="gallery-item cursor-pointer overflow-hidden rounded-md shadow-md"
                  onClick={() => handleImageClick(currentSlide, index)}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-64 object-cover transition duration-300 ease-in-out hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <button 
        onClick={goToPrevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-accent text-white p-3 rounded-r-md opacity-70 hover:opacity-100 transition duration-300 ease-in-out z-10"
        aria-label={t('accessibility.previousSlide')}
      >
        <FaChevronLeft />
      </button>
      
      <button 
        onClick={goToNextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-accent text-white p-3 rounded-l-md opacity-70 hover:opacity-100 transition duration-300 ease-in-out z-10"
        aria-label={t('accessibility.nextSlide')}
      >
        <FaChevronRight />
      </button>
      
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button 
            key={`dot-${index}`}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition duration-300 ease-in-out ${
              currentSlide === index 
                ? 'bg-accent' 
                : 'bg-neutral dark:bg-gray-600 hover:bg-accent dark:hover:bg-accent'
            }`}
            aria-label={t('accessibility.goToSlide', { number: index + 1 })}
          />
        ))}
      </div>
    </div>
  );
};

export default GallerySlider;
