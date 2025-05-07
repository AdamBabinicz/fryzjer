import { createContext, useState, useContext } from 'react';

interface GalleryContextType {
  isGalleryModalOpen: boolean;
  galleryModalImage: string;
  galleryModalAlt: string;
  openGalleryModal: (image: string, alt: string) => void;
  closeGalleryModal: () => void;
}

const GalleryContext = createContext<GalleryContextType>({
  isGalleryModalOpen: false,
  galleryModalImage: '',
  galleryModalAlt: '',
  openGalleryModal: () => {},
  closeGalleryModal: () => {}
});

export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryModalImage, setGalleryModalImage] = useState('');
  const [galleryModalAlt, setGalleryModalAlt] = useState('');
  
  const openGalleryModal = (image: string, alt: string) => {
    setGalleryModalImage(image);
    setGalleryModalAlt(alt);
    setIsGalleryModalOpen(true);
  };
  
  const closeGalleryModal = () => {
    setIsGalleryModalOpen(false);
  };
  
  return (
    <GalleryContext.Provider 
      value={{ 
        isGalleryModalOpen, 
        galleryModalImage, 
        galleryModalAlt, 
        openGalleryModal, 
        closeGalleryModal 
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
}

export function useGalleryModal() {
  const context = useContext(GalleryContext);
  
  if (!context) {
    throw new Error('useGalleryModal must be used within a GalleryProvider');
  }
  
  return context;
}
