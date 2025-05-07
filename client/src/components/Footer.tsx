import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaScissors } from 'react-icons/fa6';
import { FaFacebookF, FaInstagram, FaTwitter, FaPaperPlane } from 'react-icons/fa';
import { useToast } from '@/hooks/use-toast';
import { validateEmail } from '@/lib/utils';
import { getCurrentYear } from '@/lib/utils';
import { useForm, ValidationError } from '@formspree/react';

interface FooterProps {
  onHomeClick: () => void;
  onAboutClick: () => void;
  onServicesClick: () => void;
  onGalleryClick: () => void;
  onContactClick: () => void;
}

const Footer = ({
  onHomeClick,
  onAboutClick,
  onServicesClick,
  onGalleryClick,
  onContactClick
}: FooterProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  
  // Formspree form hook - replace with your newsletter form ID
  const [formState, handleFormspreeSubmit] = useForm("mnqeovvr");
  
  // Debug formState
  console.log("Newsletter form state:", formState);

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !validateEmail(email)) {
      toast({
        title: t('toast.error'),
        description: t('toast.invalidEmail'),
        variant: 'destructive',
      });
      return;
    }
    
    // Submit to Formspree
    handleFormspreeSubmit(e);
  };
  
  // Reset form and show success message when form is successfully submitted
  useEffect(() => {
    // Show console logs for debugging
    console.log("Newsletter form useEffect running, succeeded:", formState.succeeded);
    
    if (formState.succeeded) {
      console.log("Newsletter form succeeded, showing toast");
      
      toast({
        title: t('toast.success'),
        description: t('toast.newsletterSuccess'),
        variant: 'default',
      });
      
      setEmail('');
    }
  }, [formState.succeeded, t, toast]);

  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <FaScissors className="text-accent mr-2" />
              <span className="text-2xl font-bold playfair tracking-wider">AGILERA</span>
            </div>
            <p className="text-gray-400 mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-accent transition duration-300 ease-in-out" 
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-accent transition duration-300 ease-in-out" 
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-accent transition duration-300 ease-in-out" 
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold playfair mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={onHomeClick} 
                  className="text-gray-400 hover:text-accent transition duration-300 ease-in-out"
                >
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button 
                  onClick={onAboutClick} 
                  className="text-gray-400 hover:text-accent transition duration-300 ease-in-out"
                >
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button 
                  onClick={onServicesClick} 
                  className="text-gray-400 hover:text-accent transition duration-300 ease-in-out"
                >
                  {t('nav.services')}
                </button>
              </li>
              <li>
                <button 
                  onClick={onGalleryClick} 
                  className="text-gray-400 hover:text-accent transition duration-300 ease-in-out"
                >
                  {t('nav.gallery')}
                </button>
              </li>
              <li>
                <button 
                  onClick={onContactClick} 
                  className="text-gray-400 hover:text-accent transition duration-300 ease-in-out"
                >
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold playfair mb-6">{t('footer.newsletter')}</h4>
            <p className="text-gray-400 mb-4">
              {t('footer.newsletterText')}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="mb-4">
              <input type="hidden" name="_replyto" value="puaro@vp.pl" />
              <input type="hidden" name="form-name" value="newsletter" />
              
              <div className="flex">
                <input 
                  type="email" 
                  name="email"
                  placeholder={t('footer.yourEmail')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 flex-grow bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-accent text-white" 
                />
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-accent text-white rounded-r-md hover:bg-opacity-90 transition duration-300 ease-in-out"
                  aria-label={t('footer.subscribe')}
                  disabled={formState.submitting}
                >
                  {formState.submitting ? 
                    <span className="animate-spin">⟳</span> : 
                    <FaPaperPlane />
                  }
                </button>
              </div>
              <ValidationError prefix="Email" field="email" errors={formState.errors} className="text-red-500 text-sm mt-1" />
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {getCurrentYear()} {t('footer.copyright')}
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-accent text-sm transition duration-300 ease-in-out">{t('footer.privacyPolicy')}</a>
            <a href="#" className="text-gray-500 hover:text-accent text-sm transition duration-300 ease-in-out">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
