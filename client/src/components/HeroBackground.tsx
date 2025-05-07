import React from 'react';
import { useTranslation } from 'react-i18next';

interface HeroBackgroundProps {
  className?: string;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  
  const bgStyle = {
    backgroundColor: '#6b5b95',
    background: `url('/hero-background.svg') center center / cover no-repeat`,
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