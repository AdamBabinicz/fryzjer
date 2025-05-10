import { useState, useEffect } from "react";
import { LuScissors } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-accent hover:bg-accent/80 text-white dark:bg-[hsl(35,25%,18%)] dark:hover:bg-[hsl(35,25%,25%)] dark:hover:shadow-[0_0_20px_rgba(196,161,90,0.5)] shadow-lg transition-all duration-300 z-50 group"
          aria-label="Scroll to top"
        >
          <LuScissors className="w-6 h-6 transform group-hover:rotate-45 transition-transform duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
