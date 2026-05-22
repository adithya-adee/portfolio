"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

/**
 * Theme-aware ambient backdrop.
 *
 *   Dark  — Letterbox Noir: warm amber→crimson spotlight, hairline grid,
 *           film grain, letterbox vignettes top/bottom/sides.
 *   Light — Editorial Print: faint cream→peach spotlight, lighter grain,
 *           NO vignettes (they'd look broken on cream paper).
 *
 * Reads tokens (--backdrop-spotlight-color-*, --backdrop-grain-opacity) from
 * the active theme; the heavier decorations are gated by `isDark`.
 */
export function AuroraBackdrop() {
  const reduced = useReducedMotionSafe();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 40, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 40, damping: 20, mass: 0.6 });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const handler = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const w = window.innerWidth || 1;
        const h = window.innerHeight || 1;
        px.set((event.clientX / w - 0.5) * 32);
        py.set((event.clientY / h - 0.5) * 32);
        frame = 0;
      });
    };
    window.addEventListener("pointermove", handler, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handler);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced, px, py]);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-surface-0">
      {/* Film grain — opacity from the active theme token */}
      <div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-overlay"
        style={{
          opacity: "var(--backdrop-grain-opacity)",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "380px 380px",
        }}
      />

      {/* Hairline grid — visible in both themes at low opacity */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `
            linear-gradient(var(--text-primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Spotlight blob — color pulled from theme tokens */}
      <motion.div
        aria-hidden="true"
        className={
          "absolute -top-[8%] left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full blur-[140px] " +
          (reduced ? "" : "animate-aurora-drift")
        }
        style={{
          x: sx,
          y: sy,
          opacity: isDark ? 0.18 : 0.22,
          background:
            "radial-gradient(circle at center, var(--backdrop-spotlight-color-1) 0%, var(--backdrop-spotlight-color-2) 45%, transparent 70%)",
        }}
      />

      {/* Letterbox vignettes — dark mode only; cream paper doesn't need them */}
      {isDark ? (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/55 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/30 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/30 to-transparent"
          />
        </>
      ) : null}
    </div>
  );
}
