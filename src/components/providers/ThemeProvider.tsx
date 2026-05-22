"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Site-wide theme provider. Uses `next-themes` so the inline pre-paint script
 * writes `data-theme="dark|light"` on <html> before first render — no FOUC.
 *
 * `disableTransitionOnChange` suppresses the global color transitions while
 * we swap palettes, so the toggle is instant and clean (no chaotic 280ms
 * "every element animates" moment).
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
