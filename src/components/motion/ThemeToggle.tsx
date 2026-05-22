"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
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

  // SSR placeholder — same physical footprint so layout doesn't shift on mount.
  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="fixed right-4 top-4 z-50 h-[34px] w-[124px] rounded-sm border border-soft bg-surface-1 shadow-elev-1 backdrop-blur-sm sm:right-6 sm:top-6"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      title="Cmd/Ctrl + Shift + L"
      className={cn(
        "group fixed right-4 top-4 z-50 flex items-center gap-2 rounded-sm border border-soft bg-surface-1 px-3 py-1.5 shadow-elev-1 backdrop-blur-sm transition-colors duration-base ease-out-soft sm:right-6 sm:top-6",
        "hover:border-strong hover:bg-surface-2",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 rounded-full transition-colors duration-base",
          isDark ? "bg-accent" : "bg-primary/40"
        )}
      />
      <span
        className={cn(
          "font-mono text-label font-medium uppercase tracking-[0.15em] transition-colors duration-base",
          isDark ? "text-primary" : "text-muted"
        )}
      >
        Dark
      </span>
      <span aria-hidden="true" className="text-muted">
        ·
      </span>
      <span
        className={cn(
          "font-mono text-label font-medium uppercase tracking-[0.15em] transition-colors duration-base",
          isDark ? "text-muted" : "text-primary"
        )}
      >
        Light
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 rounded-full transition-colors duration-base",
          isDark ? "bg-primary/40" : "bg-accent"
        )}
      />
    </button>
  );
}
