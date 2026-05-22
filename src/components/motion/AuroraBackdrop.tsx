"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

/**
 * Letterbox Noir backdrop. Single warm-amber blob (the "spotlight"), a warm
 * film grain, hairline grid, and edge vignettes that letterbox the page.
 *
 * Naming kept as `AuroraBackdrop` for import compat across the codebase, but
 * the visual is now warm noir, not cool aurora.
 */
export function AuroraBackdrop() {
  const reduced = useReducedMotionSafe();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 40, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 40, damping: 20, mass: 0.6 });

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

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-surface-0">
      {/* Warm film grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "380px 380px",
        }}
      />

      {/* Hairline grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.016]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(250,250,249,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(250,250,249,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Single warm spotlight blob (amber → crimson, very subtle) */}
      <motion.div
        aria-hidden="true"
        className={
          "absolute -top-[8%] left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-[0.18] blur-[140px] " +
          (reduced ? "" : "animate-aurora-drift")
        }
        style={{
          x: sx,
          y: sy,
          background:
            "radial-gradient(circle at center, #b45309 0%, #e11d48 45%, transparent 70%)",
        }}
      />

      {/* Letterbox vignettes — top and bottom dim gradients that frame the page like a film */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent"
      />

      {/* Soft side vignettes — narrow the visual field for the cinematic feel */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/35 to-transparent"
      />
    </div>
  );
}
