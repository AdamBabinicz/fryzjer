import { createContext, useState, useContext } from 'react';
import { ServiceType } from '@/data/serviceData';

interface ServiceContextType {
  isServiceModalOpen: boolean;
  serviceData: ServiceType | null;
  openServiceModal: (service: ServiceType) => void;
  closeServiceModal: () => void;
}

const ServiceContext = createContext<ServiceContextType>({
  isServiceModalOpen: false,
  serviceData: null,
  openServiceModal: () => {},
  closeServiceModal: () => {}
});

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceData, setServiceData] = useState<ServiceType | null>(null);
  
  const openServiceModal = (service: ServiceType) => {
    setServiceData(service);
    setIsServiceModalOpen(true);
  };
  
  const closeServiceModal = () => {
    setIsServiceModalOpen(false);
  };
  
  return (
    <ServiceContext.Provider 
      value={{ 
        isServiceModalOpen, 
        serviceData, 
        openServiceModal, 
        closeServiceModal 
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}

export function useServiceModal() {
  const context = useContext(ServiceContext);
  
  if (!context) {
    throw new Error('useServiceModal must be used within a ServiceProvider');
  }
  
  return context;
}
