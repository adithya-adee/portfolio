"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Editorial "projection-room switch" toggle. Renders as a mono chip with two
 * labels — DARK · LIGHT — and a small accent dot beside the active one.
 *
 * Mounted fixed top-right in the root layout so it's globally available on
 * every route (/, /blog, /archive, /404).
 *
 * Keyboard shortcut: ⌘/Ctrl + Shift + L (industry standard, doesn't collide
 * with the `y`-yank email shortcut in Connect).
 *
 * SSR-safety: we delay rendering the actual chip until `mounted` so we don't
 * hydrate against a wrong theme. `next-themes` injects an inline script that
 * sets `data-theme` on <html> pre-paint, so the rest of the page is fine.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggle = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  // Keyboard shortcut.
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "l") return;
      if (!event.shiftKey) return;
      if (!(event.metaKey || event.ctrlKey)) return;
      event.preventDefault();
      toggle();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggle]);

  // SSR placeholder — square on mobile, full chip on sm+.
  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="fixed right-4 top-4 z-50 h-10 w-10 rounded-sm border border-soft bg-surface-1 shadow-elev-1 backdrop-blur-sm sm:right-6 sm:top-6 sm:h-[34px] sm:w-[124px]"
      />
    );
  }

  const isDark = resolvedTheme === "dark";
  const buttonBase = cn(
    "group fixed right-4 top-4 z-50 flex items-center rounded-sm border border-soft bg-surface-1 shadow-elev-1 backdrop-blur-sm transition-colors duration-base ease-out-soft sm:right-6 sm:top-6",
    "hover:border-strong hover:bg-surface-2",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0"
  );

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      title="Cmd/Ctrl + Shift + L"
      className={cn(
        buttonBase,
        // Mobile: 40×40 icon button (meets minimum touch-target). Desktop: chip.
        "h-10 w-10 justify-center sm:h-[34px] sm:w-auto sm:gap-2 sm:px-3 sm:py-1.5"
      )}
    >
      {/* Mobile icon — Sun in light mode (showing what you'll switch FROM),
          Moon in dark mode. Pattern matches GitHub/most apps. */}
      <span aria-hidden="true" className="sm:hidden">
        {isDark ? (
          <Moon className="h-5 w-5 text-primary" />
        ) : (
          <Sun className="h-5 w-5 text-accent" />
        )}
      </span>

      {/* Desktop chip */}
      <span
        aria-hidden="true"
        className={cn(
          "hidden h-1.5 w-1.5 rounded-full transition-colors duration-base sm:block",
          isDark ? "bg-accent" : "bg-primary/40"
        )}
      />
      <span
        className={cn(
          "hidden font-mono text-label font-medium uppercase tracking-[0.15em] transition-colors duration-base sm:inline",
          isDark ? "text-primary" : "text-muted"
        )}
      >
        Dark
      </span>
      <span aria-hidden="true" className="hidden text-muted sm:inline">
        ·
      </span>
      <span
        className={cn(
          "hidden font-mono text-label font-medium uppercase tracking-[0.15em] transition-colors duration-base sm:inline",
          isDark ? "text-muted" : "text-primary"
        )}
      >
        Light
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "hidden h-1.5 w-1.5 rounded-full transition-colors duration-base sm:block",
          isDark ? "bg-primary/40" : "bg-accent"
        )}
      />
    </button>
  );
}
