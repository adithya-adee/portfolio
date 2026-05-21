"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Clock10 } from "lucide-react";
import { Reveal, ScrambleText, TiltCard } from "@/components/motion";

const ROLE_PHRASES = [
  "Building Private Bridge for web apps",
  "Engineering ZKP Phase 2 ceremony",
  "Shipping production Rust services",
];

const HIGHLIGHTS = [
  "Currently building Private Bridge & ZKP Phase 2 ceremony at Umbra Privacy",
  "Shipped crab-clean (Rust CLI, 900+ downloads) & solana-indexer SDK on crates.io",
  "Top 10% across 100+ contributors in IEEE Summer of Code 2025",
];

export default function Hero() {
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
    <section className="mx-auto mt-10 max-w-3xl px-4 sm:mt-16 sm:px-6">
      <div className="space-y-6 sm:space-y-7">
        {/* Profile row */}
        <div className="flex items-start justify-between gap-4">
          <Reveal y={12} className="flex items-center gap-4">
            <TiltCard max={10} className="shrink-0">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-aurora opacity-50 blur-md" />
                <Image
                  src="/profile.png"
                  alt="Adithya Anand"
                  width={72}
                  height={72}
                  priority
                  className="relative rounded-full ring-1 ring-white/15"
                />
              </div>
            </TiltCard>

            <div className="space-y-1">
              <h1 className="bg-aurora animate-aurora-sweep bg-clip-text font-mono text-display-2 font-semibold text-transparent [background-size:200%_100%]">
                Adithya Anand
              </h1>
              <p className="font-mono text-mono text-gray-500">@glitchy_moon_</p>
            </div>
          </Reveal>

          <Reveal y={12} delay={0.1}>
            <div
              className="flex items-center gap-2 rounded-md border border-soft bg-surface-1 px-3 py-1.5 shadow-elev-1 backdrop-blur-sm"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              <Clock10
                aria-hidden="true"
                className="h-3.5 w-3.5 text-gray-400 sm:h-4 sm:w-4"
              />
              <p
                className="m-0 text-label font-medium text-gray-300"
                suppressHydrationWarning
              >
                {currentTime} <span className="text-gray-500">IST</span>
              </p>
            </div>
          </Reveal>
        </div>

        {/* Tagline + scramble line */}
        <Reveal y={14} delay={0.18}>
          <p className="text-body-1 leading-relaxed text-gray-200 sm:text-h2">
            Backend &amp; ZK Engineer at{" "}
            <span className="bg-aurora bg-clip-text font-medium text-transparent">
              Umbra Privacy
            </span>
          </p>
          <p className="mt-1 font-mono text-mono text-gray-500">
            <span className="text-gray-600">›</span>{" "}
            <ScrambleText phrases={ROLE_PHRASES} className="text-gray-400" />
          </p>
        </Reveal>

        {/* Bio */}
        <Reveal y={14} delay={0.28}>
          <p className="max-w-2xl text-body-2 leading-relaxed text-gray-400">
            I build privacy-preserving backend systems with{" "}
            <span className="text-gray-200">Rust (Axum)</span>,{" "}
            <span className="text-gray-200">Circom</span>, and{" "}
            <span className="text-gray-200">Solana</span>. Comfortable across the stack — APIs,
            distributed systems, smart contracts, and the cryptography that underpins them.
          </p>
        </Reveal>

        {/* Highlights — staggered bullet reveals */}
        <ul className="space-y-1.5">
          {HIGHLIGHTS.map((highlight, i) => (
            <Reveal
              key={highlight}
              as="li"
              y={10}
              delay={0.38 + i * 0.08}
              className="flex gap-3 font-mono text-mono leading-relaxed text-gray-400"
            >
              <span aria-hidden="true" className="select-none text-purple-400/70">
                ▸
              </span>
              <span>{highlight}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
