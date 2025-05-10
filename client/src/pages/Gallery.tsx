import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import GallerySlider from "@/components/GallerySlider";

const Gallery = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const { t } = useTranslation();

  return (
    <section
      ref={ref}
      id="gallery"
      className="py-20 px-0 sm:py-20 sm:px-8 md:py-24 md:px-12 bg-white  section-gallery"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold playfair mb-4"
          >
            {t("gallery.title")}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-accent mx-auto"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <GallerySlider />
        </motion.div>
      </div>
    </section>
  );
});

Gallery.displayName = "Gallery";

export default Gallery;
