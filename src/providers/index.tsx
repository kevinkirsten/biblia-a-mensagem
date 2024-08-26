"use client";

import { ReactNode } from "react";
import { NavigationProvider } from "@/contexts/NavigationContext";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { CookiesProvider } from "react-cookie";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <CookiesProvider>
      <NavigationProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </NavigationProvider>
    </CookiesProvider>
  );
}
