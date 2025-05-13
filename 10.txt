import React, { forwardRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { validateEmail, validatePhone } from "@/lib/utils";
import { useForm, ValidationError } from "@formspree/react";

const Contact = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  // Formspree form hook - replace with your form ID
  const [formState, handleFormspreeSubmit] = useForm("xdkgzprr");

  // Console log formState to debug
  console.log("Contact form state:", formState);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !validateEmail(formData.email),
      message: !formData.message.trim(),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: t("toast.error"),
        description: t("toast.formErrors"),
        variant: "destructive",
      });
      return;
    }

    // Submit to Formspree
    handleFormspreeSubmit(e);
  };

  // Reset form and show success message when form is successfully submitted
  useEffect(() => {
    // Show console logs for debugging
    console.log(
      "Contact form useEffect running, succeeded:",
      formState.succeeded
    );

    if (formState.succeeded) {
      console.log("Form succeeded, showing toast");

      toast({
        title: t("toast.success"),
        description: t("toast.messageSent"),
        variant: "default",
      });

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    }
  }, [formState.succeeded, t, toast]);

  return (
    <section
      ref={ref}
      id="contact"
      className="py-20 bg-neutral dark:bg-transparent section-contact"
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
            {t("contact.title")}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-accent mx-auto"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex items-start space-x-4">
              <div className="text-accent">
                <FaMapMarkerAlt size={24} />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t("contact.address")}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("contact.addressDetails")}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="text-accent">
                <FaPhoneAlt size={24} />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t("contact.phone")}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("contact.phoneNumber")}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="text-accent">
                <FaEnvelope size={24} />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t("contact.email")}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("contact.emailAddress")}
                </p>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/50 dark:bg-[#253754]/50 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold mb-4 text-center">
                {t("contact.certifications")}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center">
                <div className="flex flex-col items-center">
                  <svg
                    className="w-10 h-10 text-accent mb-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 21L12 17L17 21V3H7V21Z"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm text-center">
                    {t("contact.premiumStylist")}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <svg
                    className="w-10 h-10 text-accent mb-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15C15.866 15 19 11.866 19 8C19 4.134 15.866 1 12 1C8.13401 1 5 4.134 5 8C5 11.866 8.13401 15 12 15Z"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 15V23"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 19H16"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm text-center">
                    {t("contact.masterCertificate")}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <svg
                    className="w-10 h-10 text-accent mb-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm text-center">
                    {t("contact.colorExpert")}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <svg
                    className="w-10 h-10 text-accent mb-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm text-center">
                    {t("contact.topRated")}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <svg
                    className="w-10 h-10 text-accent mb-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V4C11 4.55228 11.4477 5 12 5C12.5523 5 13 4.55228 13 4V3Z"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 14C8 11.7909 9.79086 10 12 10C14.2091 10 16 11.7909 16 14V19C16 20.1046 15.1046 21 14 21H10C8.89543 21 8 20.1046 8 19V14Z"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <path
                      d="M17 6C17 7.65685 14.7614 9 12 9C9.23858 9 7 7.65685 7 6"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="text-sm text-center">
                    {t("contact.hairExpert")}
                  </span>
                </div>
              </div>
              <div className="mt-8 text-sm text-gray-600 dark:text-gray-400 md:text-left text-center max-w-2xl">
                <p className="mb-4">{t("contact.certificationDescription")}</p>
                <p>{t("contact.expertiseGuarantee")}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-[#253754] rounded-lg p-8 shadow-lg"
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2 font-medium">
                  {t("contact.nameLabel")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${
                    errors.name
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-accent dark:bg-[#1e2e44] dark:text-white`}
                  aria-invalid={errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-red-500 text-sm">
                    {t("contact.nameRequired")}
                  </p>
                )}
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={formState.errors}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 font-medium">
                  {t("contact.emailLabel")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-accent dark:bg-[#1e2e44] dark:text-white`}
                  aria-invalid={errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-red-500 text-sm">
                    {t("contact.emailInvalid")}
                  </p>
                )}
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={formState.errors}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="phone" className="block mb-2 font-medium">
                  {t("contact.phoneLabel")}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent dark:bg-[#1e2e44] dark:text-white"
                />
                <ValidationError
                  prefix="Phone"
                  field="phone"
                  errors={formState.errors}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 font-medium">
                  {t("contact.messageLabel")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-2 border ${
                    errors.message
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-accent dark:bg-[#1e2e44] dark:text-white`}
                  aria-invalid={errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-red-500 text-sm">
                    {t("contact.messageRequired")}
                  </p>
                )}
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={formState.errors}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-accent text-white font-medium hover:bg-opacity-90 transition duration-300 ease-in-out"
                  disabled={formState.submitting}
                >
                  {formState.submitting
                    ? t("contact.sending")
                    : t("contact.sendMessage")}
                </button>
                <ValidationError errors={formState.errors} />
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
          <div className="bg-white dark:bg-[#253754] rounded-lg shadow-lg h-64 md:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2502.356453697898!2d21.154195076940936!3d51.39898181534085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4718f80e08e8d65d%3A0x5e61190037323e6d!2sS%C5%82owackiego%2050%2C%2026-600%20Radom!5e0!3m2!1spl!2spl!4v1715863900273!5m2!1spl!2spl"
              width="100%"
              height="100%"
              allowFullScreen={false}
              loading="lazy"
              title={t("contact.mapTitle")}
              className="rounded-md"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default Contact;
