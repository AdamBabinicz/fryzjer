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
import "./index.css";

// Import i18n configuration to initialize it before rendering
import "./lib/i18n";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
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
    </HelmetProvider>
  </QueryClientProvider>
);
