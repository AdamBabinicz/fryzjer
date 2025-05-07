import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { GalleryProvider } from "./context/GalleryContext";
import { ServiceProvider } from "./context/ServiceContext";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { Router } from "wouter";
import "./index.css";

// Import and explicitly initialize i18n before rendering
import { setupI18n } from "./lib/i18n";
setupI18n(); // Ensure i18n is properly initialized once

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <Router>
        <LanguageProvider>
          <ThemeProvider>
            <GalleryProvider>
              <ServiceProvider>
                <TooltipProvider>
                  <Toaster />
                  <App />
                </TooltipProvider>
              </ServiceProvider>
            </GalleryProvider>
          </ThemeProvider>
        </LanguageProvider>
      </Router>
    </HelmetProvider>
  </QueryClientProvider>
);
