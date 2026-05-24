"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CommandPaletteHint,
  Reveal,
  ResumeLink,
  ScrambleText,
  ThemeToggle,
  useReducedMotionSafe,
} from "@/components/motion";

const ROLE_PHRASES = [
  "shipping production Rust services",
  "engineering Solana programs in Anchor",
  "writing Circom + zk-SNARK circuits",
  "designing async backend architecture",
  "parallelizing systems with Tokio",
  "modeling cryptographic protocols",
  "scaling distributed backends",
];

const HIGHLIGHTS = [
  {
    tag: "CURRENT",
    text: "Learning Circom + abstract algebra to strengthen cryptography and ZKP",
  },
  { tag: "SHIPPED", text: "crab-clean (900+ dl) and solana-indexer SDK on crates.io" },
  {
    tag: "AWARDED",
    text: "Hack to the Future 4.0 DevOps winner · Top 10% IEEE Summer of Code 2025",
  },
] as const;

const NAME = "Adithya Anand";

// Isolated island — keeps the 1Hz re-render out of the Hero subtree.
function Clock() {
  const [currentTime, setCurrentTime] = useState("--:--:--");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p
      className="m-0 font-mono text-label font-medium text-primary/85"
      suppressHydrationWarning
    >
      <span className="sm:hidden">{currentTime.slice(0, 5)}</span>
      <span className="hidden sm:inline">{currentTime}</span>
      <span className="text-primary/40"> IST</span>
    </p>
  );
}

export default function Hero() {
  const reduced = useReducedMotionSafe();

  return (
    <section className="mx-auto mt-12 max-w-3xl px-4 sm:mt-20 sm:px-6">
      <div className="space-y-8 sm:space-y-9">
        {/* Top row — letterbox label + clock. Editorial chrome. */}
        <div className="flex items-center justify-between">
          <Reveal y={6} className="flex items-center gap-2">
            <span aria-hidden="true" className="inline-block h-1 w-6 bg-accent" />
            <span className="font-mono text-label uppercase tracking-[0.25em] text-primary/60">
              portfolio · 2026
            </span>
          </Reveal>

          <Reveal y={6} delay={0.05} className="flex items-center gap-2">
            <div
              className="flex items-center gap-2 rounded-sm border border-soft bg-surface-1 px-3 py-1.5 shadow-elev-1 backdrop-blur-sm"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {/* Recording light — pulses like a real REC indicator */}
              <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>

              {/* REC label + separator — desktop only (drops on mobile to make room for the theme toggle in the same group) */}
              <span className="hidden items-center gap-2 sm:inline-flex">
                <span className="font-mono text-label font-semibold uppercase tracking-[0.15em] text-accent">
                  Rec
                </span>
                <span aria-hidden="true" className="text-tertiary">
                  ·
                </span>
              </span>

              <Clock />
            </div>

            {/* Resume CV + command palette hint + theme toggle sit inline
                with the clock so they read as one control group at the top
                of the Hero. On subpages the fixed instances in layout.tsx
                take over. ResumeLink renders null when public/resume.pdf
                doesn't exist (build-time check). */}
            <ResumeLink placement="inline" />
            <CommandPaletteHint placement="inline" />
            <ThemeToggle placement="inline" />
          </Reveal>
        </div>

        {/* Profile + name block — single row on every viewport. The display-1
            type token scales down to 30px on narrow screens (see tokens.css)
            so the name fits next to the avatar without wrapping. Avatar is
            vertically centered against the name+handle stack. */}
        <div className="flex flex-row items-center gap-4 sm:gap-8">
          <Reveal y={10} className="shrink-0">
            <div className="relative h-14 w-14 sm:h-[84px] sm:w-[84px]">
              <div className="absolute -inset-0.5 rounded-full bg-accent opacity-30 blur-md" />
              <Image
                src="/profile.webp"
                alt="Adithya Anand"
                width={84}
                height={84}
                priority
                sizes="(max-width: 640px) 56px, 84px"
                className="relative h-full w-full rounded-full ring-1 ring-primary/15"
              />
            </div>
          </Reveal>

          <div className="min-w-0 flex-1 space-y-1.5 sm:space-y-2">
            {/* Letter-by-letter serif reveal of the name */}
            <h1
              aria-label={NAME}
              className="relative inline-block font-serif text-display-1 font-normal leading-[0.95] tracking-tight text-primary"
            >
              <span aria-hidden="true" className="inline-block">
                {NAME.split("").map((char, i) => (
                  <motion.span
                    key={`${char}-${i}`}
                    initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: "0.5em" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduced ? 0 : 0.7,
                      ease: [0.22, 1, 0.36, 1],
                      delay: reduced ? 0 : 0.15 + i * 0.04,
                    }}
                    className="inline-block"
                    style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>

              {/* Crimson underline that draws in below the name */}
              <motion.span
                aria-hidden="true"
                initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: reduced ? 0 : 1,
                  ease: [0.16, 1, 0.3, 1],
                  delay: reduced ? 0 : 0.9,
                }}
                className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left bg-accent"
              />
            </h1>

            <Reveal y={6} delay={0.95}>
              <p className="font-mono text-mono text-primary/45">@glitchy_moon_</p>
            </Reveal>
          </div>
        </div>

        {/* Role + scramble line */}
        <Reveal y={10} delay={1.1}>
          <p className="text-h2 leading-snug text-primary/90">
            Backend &amp; Blockchain Engineer at{" "}
            <span className="whitespace-nowrap font-serif italic text-accent">
              Umbra Privacy
            </span>
          </p>
          <p className="mt-2 font-mono text-mono text-primary/55">
            <span className="text-accent">›</span>{" "}
            <ScrambleText
              phrases={ROLE_PHRASES}
              interval={2600}
              duration={600}
              className="text-primary/75"
            />
          </p>
        </Reveal>

        {/* Bio */}
        <Reveal y={10} delay={1.2}>
          <p className="max-w-2xl text-body-1 leading-relaxed text-primary/70">
            I build privacy-preserving backend systems with{" "}
            <span className="text-primary">Rust (Axum)</span>,{" "}
            <span className="text-primary">Circom</span>, and{" "}
            <span className="text-primary">Solana</span>. Comfortable across the stack — APIs,
            distributed systems, smart contracts, and the cryptography that underpins them.
          </p>
        </Reveal>

        {/* Highlights — editorial tag + text format */}
        <ul className="space-y-3 border-t border-soft pt-6">
          {HIGHLIGHTS.map((highlight, i) => (
            <Reveal
              key={highlight.tag}
              as="li"
              y={8}
              delay={1.3 + i * 0.08}
              className="grid grid-cols-[auto_1fr] items-baseline gap-x-3 gap-y-1.5 sm:grid-cols-[auto_auto_1fr] sm:gap-x-6 sm:gap-y-0"
            >
              <span aria-hidden="true" className="block h-2 w-2 bg-accent" />
              <span className="font-mono text-label font-semibold uppercase tracking-[0.18em] text-accent">
                {highlight.tag}
              </span>
              <span className="col-span-2 text-body-2 leading-relaxed text-primary/75 sm:col-span-1">
                {highlight.text}
              </span>
            </Reveal>
          ))}
        </ul>

        {/* Scroll cue */}
        <Reveal y={6} delay={1.7} className="flex justify-center pt-2">
          <span className="font-mono text-label uppercase tracking-[0.3em] text-primary/30">
            ──  scroll  ──
          </span>
        </Reveal>
      </div>
    </section>
  );
}
