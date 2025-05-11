import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useGalleryModal } from "@/context/GalleryContext";
import { galleryData } from "@/data/galleryData";
import { useIsMobile } from "@/hooks/use-mobile";

const GallerySlider = () => {
  const { t } = useTranslation();
  const { openGalleryModal } = useGalleryModal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const sliderRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Flatten gallery data for mobile view
  const flattenedImages = galleryData.flatMap((slide) => slide.images);
  const totalItems = isMobile ? flattenedImages.length : galleryData.length;

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      goToPrevSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToSlide = (slideIndex: number) => {
    let newIndex = slideIndex;
    if (newIndex < 0) newIndex = totalItems - 1;
    if (newIndex >= totalItems) newIndex = 0;

    setCurrentIndex(newIndex);
  };

  const goToPrevSlide = () => {
    setDirection("prev");
    goToSlide(currentIndex - 1);
  };

  const goToNextSlide = () => {
    setDirection("next");
    goToSlide(currentIndex + 1);
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
  const handleImageClick = (imageData: { fullSrc: string; alt: string }) => {
    openGalleryModal(imageData.fullSrc, imageData.alt);
  };

  const renderContent = () => {
    if (isMobile) {
      const currentImage = flattenedImages[currentIndex];
      return (
        <div className="w-full">
          <div
            className="gallery-item cursor-pointer overflow-hidden rounded-md shadow-md"
            onClick={() => handleImageClick(currentImage)}
          >
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="w-full h-64 object-cover transition duration-300 ease-in-out hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-3 gap-4">
        {galleryData[currentIndex]?.images.map((image, index) => (
          <div
            key={`image-${index}`}
            className="gallery-item cursor-pointer overflow-hidden rounded-md shadow-md"
            onClick={() => handleImageClick(image)}
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
    );
  };

  return (
    <div className="relative">
      <div
        ref={sliderRef}
        onTouchStart={(e) => {
          e.preventDefault();
          handleTouchStart(e);
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          handleTouchMove(e);
        }}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "none" }}
        className="overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{
              opacity: 0,
              x: direction === "next" ? 100 : -100,
            }}
            animate={{ opacity: 1, x: 0 }}
            exit={{
              opacity: 0,
              x: direction === "next" ? -100 : 100,
            }}
            transition={{ duration: 0.5 }}
            className="px-4"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={goToPrevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-accent text-white p-3 rounded-r-md opacity-70 hover:opacity-100 transition duration-300 ease-in-out z-10"
        aria-label={t("accessibility.previousSlide")}
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-accent text-white p-3 rounded-l-md opacity-70 hover:opacity-100 transition duration-300 ease-in-out z-10"
        aria-label={t("accessibility.nextSlide")}
      >
        <FaChevronRight />
      </button>

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition duration-300 ease-in-out ${
              currentIndex === index
                ? "bg-accent"
                : "bg-neutral dark:bg-gray-600 hover:bg-accent dark:hover:bg-accent"
            }`}
            aria-label={t("accessibility.goToSlide", { number: index + 1 })}
          />
        ))}
      </div>
    </div>
  );
};

export default GallerySlider;
