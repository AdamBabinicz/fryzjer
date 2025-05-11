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
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
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

  // Definicje klas wysokości dla obszaru, który zajmuje obrazek (i tło)
  const mobileImageCanvasHeightClass = "h-80"; // np. 24rem
  const desktopImageCanvasHeightClass = "h-[450px]";

  // Minimalna wysokość całego komponentu slidera
  const mobileMinHeightClass = "min-h-[25rem]"; // np. 24rem (wysokość obrazka) + 1rem (margines/przestrzeń)
  const desktopMinHeightClass = "min-h-[506px]"; // np. 450px (wysokość obrazka) + 56px (kropki i margines)

  // Wartości dla pozycjonowania przycisków nawigacyjnych
  const mobileButtonsTop = "12rem"; // Połowa z 24rem (h-96)
  const desktopButtonsTop = "225px"; // Połowa z 450px
  const buttonsTopOffsetValue = isMobile ? mobileButtonsTop : desktopButtonsTop;

  const goToNextSlideStable = useCallback(() => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % currentViewTotalItems);
  }, [currentViewTotalItems]);

  const pauseAutoplay = (resumeAfterMs?: number) => {
    setIsPaused(true);
    if (resumeAutoplayTimerRef.current) {
      clearTimeout(resumeAutoplayTimerRef.current);
    }
    if (resumeAfterMs) {
      resumeAutoplayTimerRef.current = setTimeout(() => {
        setIsPaused(false);
      }, resumeAfterMs);
    }
  };

  const resumeAutoplay = () => {
    if (resumeAutoplayTimerRef.current) {
      clearTimeout(resumeAutoplayTimerRef.current);
    }
    setIsPaused(false);
  };

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

  const goToSlide = (slideIndex: number, newDirection?: "next" | "prev") => {
    pauseAutoplay(isMobile ? 8000 : undefined);
    let newIndex = slideIndex;
    if (newIndex < 0) newIndex = currentViewTotalItems - 1;
    if (newIndex >= currentViewTotalItems) newIndex = 0;

    if (newDirection) {
      setDirection(newDirection);
    } else {
      if (newIndex > currentIndex) {
        if (currentIndex === 0 && newIndex === currentViewTotalItems - 1) {
          setDirection("prev");
        } else {
          setDirection("next");
        }
      } else if (newIndex < currentIndex) {
        if (currentIndex === currentViewTotalItems - 1 && newIndex === 0) {
          setDirection("next");
        } else {
          setDirection("prev");
        }
      }
    }
    setCurrentIndex(newIndex);
  };

  const goToPrevSlide = () => {
    pauseAutoplay(isMobile ? 8000 : undefined);
    setDirection("prev");
    setCurrentIndex(
      (prev) => (prev - 1 + currentViewTotalItems) % currentViewTotalItems
    );
  };

  const goToNextSlide = () => {
    pauseAutoplay(isMobile ? 8000 : undefined);
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % currentViewTotalItems);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMobile) {
      pauseAutoplay();
    }
    if (e.targetTouches && e.targetTouches.length > 0) {
      setTouchStart(e.targetTouches[0].clientX);
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };

  const memorizedHandleTouchMove = useCallback(
    (event: Event) => {
      const touchEvent = event as TouchEvent;
      if (touchEvent.targetTouches && touchEvent.targetTouches.length > 0) {
        setTouchEnd(touchEvent.targetTouches[0].clientX);
      }
    },
    [setTouchEnd]
  );

  useEffect(() => {
    const node = sliderRef.current;
    if (node) {
      const eventOptions = { passive: true } as AddEventListenerOptions;
      const listener = memorizedHandleTouchMove as EventListener;
      node.addEventListener("touchmove", listener, eventOptions);
      return () => {
        node.removeEventListener("touchmove", listener, eventOptions);
      };
    }
  }, [memorizedHandleTouchMove]);

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    let swiped = false;
    if (touchStart !== 0 && touchEnd !== 0) {
      if (touchStart - touchEnd > swipeThreshold) {
        goToNextSlide();
        swiped = true;
      } else if (touchStart - touchEnd < -swipeThreshold) {
        goToPrevSlide();
        swiped = true;
      }
    }
    if (isMobile && !swiped && touchStart !== 0) {
      if (resumeAutoplayTimerRef.current)
        clearTimeout(resumeAutoplayTimerRef.current);
      resumeAutoplayTimerRef.current = setTimeout(() => {
        setIsPaused(false);
      }, 3000);
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleImageClick = (imageData: {
    src: string;
    fullSrc?: string;
    alt: string;
  }) => {
    pauseAutoplay();
    openGalleryModal(imageData.fullSrc || imageData.src, imageData.alt);
  };

  const backgroundImageUrl = "/assets/62.jfif";

  const renderContent = (): JSX.Element | null => {
    if (isMobile) {
      const currentImage = flattenedImages[currentIndex];
      if (!currentImage) return null;
      // Obrazek wypełni cały obszar rodzica (motion.div), który ma w-full h-full
      // względem kontenera tła (tego ze złotym tłem).
      return (
        <div // Ten div jest potrzebny jako kontener dla `onClick` i dla samego `img`
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
      );
    }

    // Widok desktopowy - tutaj siatka obrazków wypełnia całą dostępną przestrzeń
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

  const handlePrevButtonClick = () => {
    goToPrevSlide();
  };

  const handleNextButtonClick = () => {
    goToNextSlide();
  };

  return (
    <div
      className={`relative ${
        isMobile ? mobileMinHeightClass : desktopMinHeightClass
      }`}
      ref={sliderRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Kontener dla tła i slajdów (obrazków) */}
      <div
        className={`relative mx-4 rounded-md overflow-hidden bg-cover bg-center bg-no-repeat ${
          isMobile
            ? mobileImageCanvasHeightClass
            : desktopImageCanvasHeightClass
        }`}
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
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
            custom={direction}
            transition={{ duration: 0.5 }}
            className="absolute top-0 left-0 w-full h-full" // Ten w-full h-full odnosi się do rodzica (kontenera tła)
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Przyciski nawigacyjne */}
      <button
        onClick={handlePrevButtonClick}
        onPointerUp={isMobile ? handlePrevButtonClick : undefined}
        className="absolute left-0 transform -translate-y-1/2 -translate-x-0 md:-translate-x-1/2 bg-accent text-white p-3 rounded-r-md md:rounded-full opacity-70 hover:opacity-100 transition duration-300 ease-in-out z-10 cursor-pointer"
        style={{ top: buttonsTopOffsetValue }}
        aria-label={t("accessibility.previousSlide")}
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={handleNextButtonClick}
        onPointerUp={isMobile ? handleNextButtonClick : undefined}
        className="absolute right-0 transform -translate-y-1/2 translate-x-0 md:translate-x-1/2 bg-accent text-white p-3 rounded-l-md md:rounded-full opacity-70 hover:opacity-100 transition duration-300 ease-in-out z-10 cursor-pointer"
        style={{ top: buttonsTopOffsetValue }}
        aria-label={t("accessibility.nextSlide")}
      >
        <FaChevronRight />
      </button>

      {/* Kropki nawigacyjne (tylko desktop) */}
      {!isMobile && (
        <div className="flex justify-center items-center mt-6 gap-2">
          {renderDots()}
        </div>
      )}
    </div>
  );
};

export default GallerySlider;
