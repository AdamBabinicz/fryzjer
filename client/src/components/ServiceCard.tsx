// ServiceCard.tsx
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useServiceModal } from "@/context/ServiceContext";
import { ServiceType } from "@/data/serviceData";

interface ServiceCardProps {
  service: ServiceType;
  className?: string;
  onClick?: () => void; // Upewniamy się, że onClick jest opcjonalnym props
}

const ServiceCard = ({ service, className, onClick }: ServiceCardProps) => {
  const { t } = useTranslation();
  const { openServiceModal } = useServiceModal();

  // Funkcja obsługująca kliknięcie "Learn More"
  const handleLearnMore = () => {
    console.log("Kliknięto Learn More:", service);
    openServiceModal(service);
    if (onClick) onClick(); // Jeśli onClick jest przekazany, to jest wywoływany
  };

  return (
    <div
      className={cn(
        "bg-white dark:bg-[#1e1e1e] rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out hover:shadow-xl",
        className
      )}
    >
      <img
        src={service.image}
        alt={service.title}
        className="w-full h-96 object-cover"
        loading="lazy"
      />
      <div className="p-6">
        <h4 className="text-xl font-semibold playfair mb-2">{service.title}</h4>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {service.shortDescription}
        </p>
        <div className="flex justify-between items-center gap-x-2">
          <span className="text-accent font-bold text-xl">{service.price}</span>
          <button
            onClick={handleLearnMore}
            className="text-sm px-4 py-2 border border-accent text-accent hover:bg-accent hover:text-white transition duration-300 ease-in-out"
          >
            {t("services.learnMore")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
