"use client";

import { ReactNode } from "react";
import { NavigationProvider } from "@/contexts/NavigationContext";
import { ThemeProvider } from "@/providers/ThemeProvider";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <NavigationProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </NavigationProvider>
  );
}
