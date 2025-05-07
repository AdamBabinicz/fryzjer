import { forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { validateEmail, validatePhone } from '@/lib/utils';

const Contact = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !validateEmail(formData.email),
      message: !formData.message.trim()
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: t('toast.error'),
        description: t('toast.formErrors'),
        variant: 'destructive',
      });
      return;
    }
    
    // Here you would typically send the form data to your backend or a form service
    console.log('Form submitted with data:', formData);
    
    toast({
      title: t('toast.success'),
      description: t('toast.messageSent'),
    });
    
    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };
  
  return (
    <section ref={ref} id="contact" className="py-20 bg-neutral dark:bg-[#1e1e1e]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold playfair mb-4"
          >
            {t('contact.title')}
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-accent mx-auto"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white dark:bg-[#121212] rounded-lg shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold playfair mb-6">{t('contact.contactInfo')}</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-accent mt-1 w-6" />
                  <div className="ml-4">
                    <h4 className="font-semibold mb-1">{t('contact.address')}</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      ul. Przykładowa 123<br />00-001 Warszawa
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaPhoneAlt className="text-accent mt-1 w-6" />
                  <div className="ml-4">
                    <h4 className="font-semibold mb-1">{t('contact.phone')}</h4>
                    <p className="text-gray-600 dark:text-gray-400">+48 123 456 789</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaEnvelope className="text-accent mt-1 w-6" />
                  <div className="ml-4">
                    <h4 className="font-semibold mb-1">{t('contact.email')}</h4>
                    <p className="text-gray-600 dark:text-gray-400">kontakt@agilera.pl</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-[#121212] rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold playfair mb-6">{t('contact.openingHours')}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{t('contact.mondayFriday')}</span>
                  <span className="font-semibold">9:00 - 19:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{t('contact.saturday')}</span>
                  <span className="font-semibold">9:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{t('contact.sunday')}</span>
                  <span className="font-semibold">{t('contact.closed')}</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-[#121212] rounded-lg shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold playfair mb-6">{t('contact.writeToUs')}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  {t('contact.nameLabel')}
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-md focus:outline-none focus:ring-2 focus:ring-accent dark:bg-[#1e1e1e] dark:text-white`}
                  aria-invalid={errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-red-500 text-sm">
                    {t('contact.nameRequired')}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  {t('contact.emailLabel')}
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-md focus:outline-none focus:ring-2 focus:ring-accent dark:bg-[#1e1e1e] dark:text-white`}
                  aria-invalid={errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-red-500 text-sm">
                    {t('contact.validEmailRequired')}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block mb-2 font-medium">
                  {t('contact.phoneLabel')}
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent dark:bg-[#1e1e1e] dark:text-white" 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  {t('contact.messageLabel')}
                </label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-md focus:outline-none focus:ring-2 focus:ring-accent dark:bg-[#1e1e1e] dark:text-white`}
                  aria-invalid={errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-red-500 text-sm">
                    {t('contact.messageRequired')}
                  </p>
                )}
              </div>
              
              <div>
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-accent text-white font-medium hover:bg-opacity-90 transition duration-300 ease-in-out"
                >
                  {t('contact.sendMessage')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12"
        >
          <div className="bg-white dark:bg-[#121212] rounded-lg shadow-lg p-4 h-64 md:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.3151954985895!2d21.00717661593672!3d52.23178017976199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471eccf695420895%3A0xcb0e27f11ace068!2sWarsaw%2C%20Poland!5e0!3m2!1sen!2sus!4v1627654835981!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              title={t('contact.mapTitle')}
              className="rounded-md"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;
