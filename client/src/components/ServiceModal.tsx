import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useServiceModal } from "@/context/ServiceContext";

const ServiceModal = () => {
  const { t } = useTranslation();
  const { isServiceModalOpen, serviceData, closeServiceModal } =
    useServiceModal();

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isServiceModalOpen) {
        closeServiceModal();
      }
    };
    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isServiceModalOpen, closeServiceModal]);

  useEffect(() => {
    if (isServiceModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isServiceModalOpen]);

  const handleBookAppointment = () => {
    closeServiceModal();
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        window.scrollTo({
          top: contactSection.offsetTop - 80,
          behavior: "smooth",
        });
      }
    }, 300);
  };

  const modalBackdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalContentVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.85,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  if (!isServiceModalOpen || !serviceData) {
    return null;
  }

  return (
    <AnimatePresence>
      {isServiceModalOpen && serviceData && (
        <motion.div
          key="modal-backdrop"
          variants={modalBackdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
          onClick={closeServiceModal}
        >
          <motion.div
            key="modal-content"
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white dark:bg-[#1e1e1e] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
          >
            <motion.button
              onClick={closeServiceModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-accent text-xl transition duration-300 ease-in-out"
              aria-label={t("accessibility.closeModal")}
              variants={itemVariants} // Przycisk też może być częścią kaskady
            >
              <FaTimes />
            </motion.button>
            <div className="p-8">
              <motion.h3
                id="service-modal-title"
                variants={itemVariants}
                className="text-2xl font-bold playfair mb-4"
              >
                {serviceData.title}
              </motion.h3>
              <motion.div
                variants={itemVariants}
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: serviceData.fullDescription,
                }}
              />
              <motion.div
                variants={itemVariants}
                className="mt-8 flex justify-between items-center"
              >
                <motion.span
                  variants={itemVariants}
                  className="text-accent font-bold text-xl"
                >
                  {serviceData.price}
                </motion.span>
                <motion.button
                  onClick={handleBookAppointment}
                  className="px-6 py-2 bg-accent text-white font-medium hover:bg-opacity-90 transition duration-300 ease-in-out"
                  variants={itemVariants}
                >
                  {t("services.bookAppointment")}
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
