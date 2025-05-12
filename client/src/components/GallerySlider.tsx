import { useState, useEffect, useRef, useCallback } from "react";
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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const sliderRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const resumeAutoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const flattenedImages = galleryData.flatMap((slide) => slide.images);
  const desktopTotalSlides = galleryData.length;
  const mobileTotalSlides = flattenedImages.length;
  const currentViewTotalItems = isMobile
    ? mobileTotalSlides
    : desktopTotalSlides;

  const goToNextSlideStable = useCallback(() => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % currentViewTotalItems);
  }, [currentViewTotalItems]);

  const pauseAutoplay = useCallback((resumeAfterMs?: number) => {
    setIsPaused(true);
    if (resumeAutoplayTimerRef.current) {
      clearTimeout(resumeAutoplayTimerRef.current);
      resumeAutoplayTimerRef.current = null;
    }
    if (resumeAfterMs) {
      resumeAutoplayTimerRef.current = setTimeout(() => {
        setIsPaused(false);
      }, resumeAfterMs);
    }
  }, []);

  const resumeAutoplay = useCallback(() => {
    if (resumeAutoplayTimerRef.current) {
      clearTimeout(resumeAutoplayTimerRef.current);
      resumeAutoplayTimerRef.current = null;
    }

    setIsPaused(false);
  }, []);

  useEffect(() => {
    const clearAutoplayInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    if (!isPaused && currentViewTotalItems > 1) {
      clearAutoplayInterval();
      intervalRef.current = setInterval(goToNextSlideStable, 5000);
    } else {
      clearAutoplayInterval();
    }

    return () => {
      clearAutoplayInterval();
      if (resumeAutoplayTimerRef.current) {
        clearTimeout(resumeAutoplayTimerRef.current);
      }
    };
  }, [isPaused, currentViewTotalItems, goToNextSlideStable]);

  const goToSlide = useCallback(
    (slideIndex: number, newDirection?: "next" | "prev") => {
      pauseAutoplay(isMobile ? 8000 : undefined);
      let newIndex = slideIndex;
      if (newIndex < 0) newIndex = currentViewTotalItems - 1;
      if (newIndex >= currentViewTotalItems) newIndex = 0;

      if (newDirection) {
        setDirection(newDirection);
      } else {
        const currentIdx = currentIndex;
        if (newIndex > currentIdx) {
          if (currentIdx === 0 && newIndex === currentViewTotalItems - 1) {
            setDirection("prev");
          } else {
            setDirection("next");
          }
        } else if (newIndex < currentIdx) {
          if (currentIdx === currentViewTotalItems - 1 && newIndex === 0) {
            setDirection("next");
          } else {
            setDirection("prev");
          }
        }
      }
      setCurrentIndex(newIndex);
    },
    [currentIndex, currentViewTotalItems, isMobile, pauseAutoplay]
  );

  const goToPrevSlide = useCallback(() => {
    pauseAutoplay(isMobile ? 8000 : undefined);
    setDirection("prev");
    setCurrentIndex(
      (prev) => (prev - 1 + currentViewTotalItems) % currentViewTotalItems
    );
  }, [currentViewTotalItems, isMobile, pauseAutoplay]);

  const goToNextSlide = useCallback(() => {
    pauseAutoplay(isMobile ? 8000 : undefined);
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % currentViewTotalItems);
  }, [currentViewTotalItems, isMobile, pauseAutoplay]);

  useEffect(() => {
    const node = sliderRef.current;
    if (!node) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (isMobile) {
        pauseAutoplay();
      }
      if (e.targetTouches && e.targetTouches.length > 0) {
        setTouchStart(e.targetTouches[0].clientX);
        setTouchEnd(null);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.targetTouches && e.targetTouches.length > 0) {
        setTouchEnd(e.targetTouches[0].clientX);
      }
    };

    const handleTouchEnd = () => {
      const swipeThreshold = 50;
      let swiped = false;

      if (touchStart !== null && touchEnd !== null) {
        const deltaX = touchStart - touchEnd;
        if (deltaX > swipeThreshold) {
          goToNextSlide();
          swiped = true;
        } else if (deltaX < -swipeThreshold) {
          goToPrevSlide();
          swiped = true;
        }
      }

      if (isMobile && !swiped && touchStart !== null) {
        if (resumeAutoplayTimerRef.current) {
          clearTimeout(resumeAutoplayTimerRef.current);
        }

        resumeAutoplayTimerRef.current = setTimeout(() => {
          setIsPaused(false);
        }, 3000);
      }

      setTouchStart(null);
      setTouchEnd(null);
    };

    node.addEventListener("touchstart", handleTouchStart, { passive: true });
    node.addEventListener("touchmove", handleTouchMove, { passive: true });
    node.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      node.removeEventListener("touchstart", handleTouchStart);
      node.removeEventListener("touchmove", handleTouchMove);
      node.removeEventListener("touchend", handleTouchEnd);

      if (resumeAutoplayTimerRef.current) {
        clearTimeout(resumeAutoplayTimerRef.current);
      }
    };
  }, [
    isMobile,
    pauseAutoplay,
    goToNextSlide,
    goToPrevSlide,
    touchStart,
    touchEnd,
  ]);

  const handleImageClick = (imageData: {
    src: string;
    fullSrc?: string;
    alt: string;
  }) => {
    pauseAutoplay();
    openGalleryModal(imageData.fullSrc || imageData.src, imageData.alt);
  };

  const backgroundImageUrl = "/assets/62.avif";

  const renderContent = (): JSX.Element | null => {
    if (isMobile) {
      const currentImage = flattenedImages[currentIndex];
      if (!currentImage) return null;
      return (
        <div className="w-full h-full flex items-center justify-center p-0.5">
          <div
            className="gallery-item cursor-pointer overflow-hidden rounded-md shadow-md w-full h-full"
            onClick={() => handleImageClick(currentImage)}
          >
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-105 rounded-md"
              loading="lazy"
            />
          </div>
        </div>
      );
    }

    const currentSlideData = galleryData[currentIndex];
    if (!currentSlideData || !currentSlideData.images) return null;

    return (
      <div className={`grid grid-cols-3 gap-4 w-full h-full p-px`}>
        {currentSlideData.images.map((image, index) => (
          <div
            key={`image-${currentIndex}-${index}`}
            className="gallery-item cursor-pointer overflow-hidden rounded-md shadow-md h-full"
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-105 rounded-md"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    );
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      pauseAutoplay();
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      resumeAutoplay();
    }
  };

  const renderDots = (): JSX.Element[] => {
    const dots = [];
    const itemsToIterate = currentViewTotalItems;
    for (let i = 0; i < itemsToIterate; i++) {
      dots.push(
        <button
          key={`dot-${i}`}
          onClick={() => goToSlide(i)}
          className={`w-3 h-3 rounded-full transition duration-300 ease-in-out ${
            currentIndex === i
              ? "bg-accent"
              : "bg-neutral dark:bg-gray-600 hover:bg-accent dark:hover:bg-accent"
          }`}
          aria-label={t("accessibility.goToSlide", { number: i + 1 })}
        />
      );
    }
    return dots;
  };

  const spaceForDotsAndMarginPx = 56;
  const mobileImageHeight = "24rem";
  const desktopGridHeight = "450px";
  const contentAreaHeight = isMobile ? mobileImageHeight : desktopGridHeight;

  const buttonsTopOffset = `calc(${contentAreaHeight} / 2)`;

  const mobileContainerMinHeight = `min-h-[calc(${mobileImageHeight} + 1rem)]`;
  const desktopContainerMinHeight = `min-h-[calc(${desktopGridHeight} + ${spaceForDotsAndMarginPx}px)]`;
  const handlePrevButtonClick = useCallback(() => {
    goToPrevSlide();
  }, [goToPrevSlide]);

  const handleNextButtonClick = useCallback(() => {
    goToNextSlide();
  }, [goToNextSlide]);

  return (
    <div
      className={`relative ${
        isMobile ? mobileContainerMinHeight : desktopContainerMinHeight
      }`}
      ref={sliderRef}
    >
      <div
        className="relative rounded-md overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          height: contentAreaHeight,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{
              opacity: 0,
              x: direction === "next" ? "100%" : "-100%",
            }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{
              opacity: 0,
              x: direction === "next" ? "-100%" : "100%",
            }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 left-0 w-full h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={handlePrevButtonClick}
        className="absolute left-0 transform -translate-y-1/2 -translate-x-0 md:-translate-x-1/2 bg-accent text-white p-3 rounded-r-md md:rounded-full opacity-70 hover:opacity-100 transition duration-300 ease-in-out z-10 cursor-pointer"
        style={{ top: buttonsTopOffset }}
        aria-label={t("accessibility.previousSlide")}
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={handleNextButtonClick}
        className="absolute right-0 transform -translate-y-1/2 translate-x-0 md:translate-x-1/2 bg-accent text-white p-3 rounded-l-md md:rounded-full opacity-70 hover:opacity-100 transition duration-300 ease-in-out z-10 cursor-pointer"
        style={{ top: buttonsTopOffset }}
        aria-label={t("accessibility.nextSlide")}
      >
        <FaChevronRight />
      </button>

      {!isMobile && (
        <div
          className="flex justify-center items-center mt-6 gap-2" //
        >
          {renderDots()}
        </div>
      )}
    </div>
  );
};

export default GallerySlider;
