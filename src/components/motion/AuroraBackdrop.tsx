"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

/**
 * The page's ambient background — replaces the static blobs that used to
 * live inline in layout.tsx.
 *
 * Two large blurred blobs drift in opposite organic loops. A faint pointer
 * parallax nudges them when the user moves their cursor. Under reduced-motion
 * the drift is killed and the parallax is disabled — the blobs become static.
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
        px.set((event.clientX / w - 0.5) * 40);
        py.set((event.clientY / h - 0.5) * 40);
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
      {/* Film grain — same SVG that used to live in layout.tsx. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "400px 400px",
        }}
      />

      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Blob A — violet, top-right */}
      <motion.div
        aria-hidden="true"
        className={
          "absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-purple-600 opacity-[0.10] blur-[120px] " +
          (reduced ? "" : "animate-aurora-drift")
        }
        style={{ x: sx, y: sy }}
      />

      {/* Blob B — blue/cyan, bottom-left */}
      <motion.div
        aria-hidden="true"
        className={
          "absolute -left-[10%] top-1/2 h-[460px] w-[460px] rounded-full bg-blue-600 opacity-[0.09] blur-[120px] " +
          (reduced ? "" : "animate-aurora-drift")
        }
        style={{
          x: reduced ? 0 : sx,
          y: reduced ? 0 : sy,
          animationDelay: "-7s",
          animationDirection: "reverse",
        }}
      />

      {/* Top-down gradient for depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-transparent to-transparent"
      />
    </div>
  );
}
