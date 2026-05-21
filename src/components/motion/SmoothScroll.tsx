"use client";

import { useEffect } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

/**
 * Mounts Lenis once at the layout level for desktop, non-reduced-motion users.
 * Lenis is imported lazily so its ~10 KB only ships when actually used.
 *
 * Bail conditions:
 *   - prefers-reduced-motion
 *   - coarse pointer (touch / mobile)
 *   - Lenis dynamic import fails (silent no-op)
 */
export function SmoothScroll() {
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let lenisInstance: { destroy: () => void; raf: (time: number) => void } | null = null;
    let rafId = 0;
    let cancelled = false;

    (async () => {
      try {
        const mod = await import("lenis");
        if (cancelled) return;
        const Lenis = mod.default;
        lenisInstance = new Lenis({
          duration: 1.1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          wheelMultiplier: 1,
          touchMultiplier: 1,
        });

        const raf = (time: number) => {
          lenisInstance?.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      } catch {
        // Lenis failed to load — fall back to native scroll silently.
      }
    })();

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      lenisInstance?.destroy();
    };
  }, [reduced]);

  return null;
}
