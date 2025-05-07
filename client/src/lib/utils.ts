import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with conditional logic and Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Scrolls to an element with a smooth animation
 */
export function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80, // Adjust for header height
      behavior: "smooth",
    });
  }
}

/**
 * Formats a date as a year
 */
export function getCurrentYear(): string {
  return new Date().getFullYear().toString();
}

/**
 * Validates an email address
 */
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validates a phone number (basic validation)
 */
export function validatePhone(phone: string): boolean {
  // Accept digits, spaces, dashes, plus sign, and parentheses
  const re = /^[0-9+\-() ]+$/;
  return re.test(phone);
}
