import React from 'react';
import { useTranslation } from 'react-i18next';

interface HeroBackgroundProps {
  className?: string;
}

/**
 * Hero background component that displays the main background image
 * Uses a public URL approach that's more reliable in Replit's environment
 */
const HeroBackground: React.FC<HeroBackgroundProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  
  // Replit works better with assets directly in the public folder
  const bgStyle = {
    backgroundImage: `url('/salon-6964527_1280.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#6b5b95', // Fallback color
    width: '100%',
    height: '100%',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    zIndex: 0
  };
  
  return (
    <div className={`w-full h-full relative ${className}`} aria-label={t('home.heroAlt')}>
      <div style={bgStyle}></div>
    </div>
  );
};

export default HeroBackground;