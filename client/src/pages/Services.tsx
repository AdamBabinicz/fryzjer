// Services.tsx
import { forwardRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import {
  ServiceType,
  haircutServices as haircutServicesPL,
  stylingServices as stylingServicesPL,
  coloringServices as coloringServicesPL,
} from "@/data/serviceData";
import {
  haircutServices as haircutServicesEN,
  stylingServices as stylingServicesEN,
  coloringServices as coloringServicesEN,
} from "@/data/serviceDataEn";
import { useServiceModal } from "@/context/ServiceContext";

const Services = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const { t, i18n } = useTranslation();
  const { openServiceModal } = useServiceModal();

  // Use appropriate service data based on the current language
  const haircutServices = useMemo(() => {
    return i18n.language === "en" ? haircutServicesEN : haircutServicesPL;
  }, [i18n.language]);

  const stylingServices = useMemo(() => {
    return i18n.language === "en" ? stylingServicesEN : stylingServicesPL;
  }, [i18n.language]);

  const coloringServices = useMemo(() => {
    return i18n.language === "en" ? coloringServicesEN : coloringServicesPL;
  }, [i18n.language]);

  // Animation variants
  const serviceVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const handleServiceCardClick = (service: ServiceType) => {
    openServiceModal(service); // Otwórz modal dla konkretnej usługi
  };

  return (
    <section
      ref={ref}
      id="services"
      className="py-20 bg-neutral dark:bg-transparent section-services"
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
            {t("services.title")}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-accent mx-auto"
          />
        </div>

        <div id="services-haircut" className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold playfair mb-8 text-center"
          >
            {t("services.haircut")}
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {haircutServices.map((service: ServiceType, index: number) => (
              <motion.div
                key={`haircut-${index}`}
                variants={serviceVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
              >
                <ServiceCard
                  service={service}
                  onClick={() => handleServiceCardClick(service)} // Przekazujemy funkcję onClick
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div id="services-styling" className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold playfair mb-8 text-center"
          >
            {t("services.styling")}
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stylingServices.map((service: ServiceType, index: number) => (
              <motion.div
                key={`styling-${index}`}
                variants={serviceVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
              >
                <ServiceCard
                  service={service}
                  onClick={() => handleServiceCardClick(service)} // Przekazujemy funkcję onClick
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div id="services-coloring">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold playfair mb-8 text-center"
          >
            {t("services.coloring")}
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coloringServices.map((service: ServiceType, index: number) => (
              <motion.div
                key={`coloring-${index}`}
                variants={serviceVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
              >
                <ServiceCard
                  service={service}
                  onClick={() => handleServiceCardClick(service)} // Przekazujemy funkcję onClick
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Services.displayName = "Services";

export default Services;
