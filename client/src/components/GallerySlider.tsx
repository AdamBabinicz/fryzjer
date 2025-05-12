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
  const [touchStart, setTouchStart] = useState<number | null>(null); // Use null initial state
  const [touchEnd, setTouchEnd] = useState<number | null>(null); // Use null initial state
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
        setIsPaused(false); // Resume after delay
      }, resumeAfterMs);
    }
  }, []); // Added dependency array

  const resumeAutoplay = useCallback(() => {
    if (resumeAutoplayTimerRef.current) {
      clearTimeout(resumeAutoplayTimerRef.current);
      resumeAutoplayTimerRef.current = null;
    }
    // Check if it should actually resume (e.g., not manually paused indefinitely)
    // For simplicity, always setting to false here, assuming temp pause
    setIsPaused(false);
  }, []); // Added dependency array

  // Autoplay Effect
  useEffect(() => {
    const clearAutoplayInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    if (!isPaused && currentViewTotalItems > 1) {
      clearAutoplayInterval(); // Clear previous before setting new
      intervalRef.current = setInterval(goToNextSlideStable, 5000);
    } else {
      clearAutoplayInterval(); // Ensure cleared if paused or only 1 item
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      clearAutoplayInterval();
      if (resumeAutoplayTimerRef.current) {
        clearTimeout(resumeAutoplayTimerRef.current);
      }
    };
  }, [isPaused, currentViewTotalItems, goToNextSlideStable]);

  // goToSlide needs pauseAutoplay dependency
  const goToSlide = useCallback(
    (slideIndex: number, newDirection?: "next" | "prev") => {
      pauseAutoplay(isMobile ? 8000 : undefined); // Pause with timeout on mobile
      let newIndex = slideIndex;
      if (newIndex < 0) newIndex = currentViewTotalItems - 1;
      if (newIndex >= currentViewTotalItems) newIndex = 0;

      if (newDirection) {
        setDirection(newDirection);
      } else {
        const currentIdx = currentIndex; // Read state once
        if (newIndex > currentIdx) {
          if (currentIdx === 0 && newIndex === currentViewTotalItems - 1) {
            setDirection("prev"); // Wrap around backward
          } else {
            setDirection("next");
          }
        } else if (newIndex < currentIdx) {
          if (currentIdx === currentViewTotalItems - 1 && newIndex === 0) {
            setDirection("next"); // Wrap around forward
          } else {
            setDirection("prev");
          }
        }
        // If newIndex === currentIndex, direction doesn't matter as much
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

  // --- Passive Touch Event Handling ---
  useEffect(() => {
    const node = sliderRef.current;
    if (!node) return; // Ensure node exists

    const handleTouchStart = (e: TouchEvent) => {
      if (isMobile) {
        // Pause immediately on mobile touch
        pauseAutoplay();
      }
      if (e.targetTouches && e.targetTouches.length > 0) {
        setTouchStart(e.targetTouches[0].clientX);
        setTouchEnd(null); // Reset touch end on new touch start
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // No preventDefault() here, safe for passive
      if (e.targetTouches && e.targetTouches.length > 0) {
        setTouchEnd(e.targetTouches[0].clientX);
      }
    };

    const handleTouchEnd = () => {
      const swipeThreshold = 50;
      let swiped = false;

      // Ensure both touchStart and touchEnd have valid numbers
      if (touchStart !== null && touchEnd !== null) {
        const deltaX = touchStart - touchEnd;
        if (deltaX > swipeThreshold) {
          goToNextSlide(); // Swipe left
          swiped = true;
        } else if (deltaX < -swipeThreshold) {
          goToPrevSlide(); // Swipe right
          swiped = true;
        }
      }

      // Resume autoplay logic for mobile after a tap/hold (not swipe)
      if (isMobile && !swiped && touchStart !== null) {
        if (resumeAutoplayTimerRef.current) {
          clearTimeout(resumeAutoplayTimerRef.current);
        }
        // Resume after a short delay if no swipe occurred
        resumeAutoplayTimerRef.current = setTimeout(() => {
          setIsPaused(false); // Directly resume
        }, 3000);
      }

      // Reset touch points
      setTouchStart(null);
      setTouchEnd(null);
    };

    // Add passive listeners
    node.addEventListener("touchstart", handleTouchStart, { passive: true });
    node.addEventListener("touchmove", handleTouchMove, { passive: true });
    node.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Cleanup function to remove listeners
    return () => {
      node.removeEventListener("touchstart", handleTouchStart);
      node.removeEventListener("touchmove", handleTouchMove);
      node.removeEventListener("touchend", handleTouchEnd);
      // Clear any pending resume timer on cleanup
      if (resumeAutoplayTimerRef.current) {
        clearTimeout(resumeAutoplayTimerRef.current);
      }
    };
    // Dependencies: Include functions from useCallback and state setters if needed
    // Since state setters are stable and callbacks have deps, include callbacks
  }, [
    isMobile,
    pauseAutoplay,
    goToNextSlide,
    goToPrevSlide,
    touchStart,
    touchEnd,
  ]); // Added touchEnd
  // --- End Passive Touch Event Handling ---

  const handleImageClick = (imageData: {
    src: string;
    fullSrc?: string;
    alt: string;
  }) => {
    pauseAutoplay(); // Pause indefinitely when modal opens
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

  // Pause/Resume on hover for desktop
  const handleMouseEnter = () => {
    if (!isMobile) {
      pauseAutoplay(); // Pause indefinitely on hover
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      resumeAutoplay(); // Resume immediately on leave
    }
  };

  const renderDots = (): JSX.Element[] => {
    const dots = [];
    const itemsToIterate = currentViewTotalItems;
    for (let i = 0; i < itemsToIterate; i++) {
      dots.push(
        <button
          key={`dot-${i}`}
          onClick={() => goToSlide(i)} // Use the memoized goToSlide
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
  const mobileImageHeight = "24rem"; // 384px
  const desktopGridHeight = "450px";
  const contentAreaHeight = isMobile ? mobileImageHeight : desktopGridHeight;

  // Calculate top offset for buttons dynamically based on content height
  const buttonsTopOffset = `calc(${contentAreaHeight} / 2)`;

  // Calculate min container height dynamically
  const mobileContainerMinHeight = `min-h-[calc(${mobileImageHeight} + 1rem)]`; // Added 1rem for potential spacing below image
  const desktopContainerMinHeight = `min-h-[calc(${desktopGridHeight} + ${spaceForDotsAndMarginPx}px)]`; // Height + dots/margin

  // Use useCallback for button handlers to ensure stability if passed as props later
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
      // Remove onTouch handlers from here
    >
      <div
        className="relative rounded-md overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          height: contentAreaHeight, // Use calculated height
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
            className="absolute top-0 left-0 w-full h-full" // Ensure motion div fills container
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev Button */}
      <button
        onClick={handlePrevButtonClick}
        className="absolute left-0 transform -translate-y-1/2 -translate-x-0 md:-translate-x-1/2 bg-accent text-white p-3 rounded-r-md md:rounded-full opacity-70 hover:opacity-100 transition duration-300 ease-in-out z-10 cursor-pointer"
        style={{ top: buttonsTopOffset }} // Dynamic top position
        aria-label={t("accessibility.previousSlide")}
      >
        <FaChevronLeft />
      </button>

      {/* Next Button */}
      <button
        onClick={handleNextButtonClick}
        className="absolute right-0 transform -translate-y-1/2 translate-x-0 md:translate-x-1/2 bg-accent text-white p-3 rounded-l-md md:rounded-full opacity-70 hover:opacity-100 transition duration-300 ease-in-out z-10 cursor-pointer"
        style={{ top: buttonsTopOffset }} // Dynamic top position
        aria-label={t("accessibility.nextSlide")}
      >
        <FaChevronRight />
      </button>

      {/* Dots (Desktop only) */}
      {!isMobile && (
        <div
          className="flex justify-center items-center mt-6 gap-2" // Consistent Tailwind margin
        >
          {renderDots()}
        </div>
      )}
    </div>
  );
};

export default GallerySlider;
