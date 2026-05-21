"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Clock10 } from "lucide-react";

export default function HeroMinimal() {
  const [currentTime, setCurrentTime] = useState("--:--:--");

  const highlights = [
    "Backend Developer at Umbra Privacy — building the Private Bridge for web apps & engineering the ZKP Phase 2 trusted-setup ceremony",
    "Shipped crab-clean (Rust CLI, 900+ downloads on crates.io) & solana-indexer SDK with reorg-safe block ingestion",
    "Top 10% across 100+ contributors in IEEE Summer of Code 2025 — refactored TensorZero LLM infra and led a FinTech module",
  ];

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mx-auto mt-8 max-w-3xl px-4 sm:mt-12 sm:px-6">
      <div className="space-y-4 sm:space-y-5">
        {/* Metadata Row */}

        {/* Name & Handle with Profile Image */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/profile.png"
              alt="Adithya Anand"
              width={64}
              height={64}
              className="rounded-full ring-2 ring-purple-500/30"
            />
            <div className="space-y-0.5">
              <h1 className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text font-mono text-2xl font-semibold leading-tight tracking-tight text-transparent sm:text-3xl md:text-2xl">
                Adithya Anand
              </h1>
              <p className="text-sm tracking-wide text-gray-400 sm:text-base">@glitchy_moon</p>
            </div>
          </div>
          <div 
            className="flex items-center gap-2 rounded-md border border-zinc-700/40 bg-neutral-900/40 px-3 py-1.5"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            <Clock10 className="h-3.5 w-3.5 text-gray-400 sm:h-4 sm:w-4" />
            <p className="m-0 text-xs font-medium tracking-wide text-gray-300 sm:text-sm" suppressHydrationWarning>
              {currentTime} GMT+5:30
            </p>
          </div>
        </div>

        {/* Subtitle */}
        <p className="font-sans text-base leading-relaxed tracking-wide text-gray-300 sm:text-lg">
          Backend &amp; ZK Engineer <span className="text-gray-500">·</span>{" "}
          <span className="text-purple-400">Umbra Privacy</span>
        </p>

        {/* Bio */}
        <p className="max-w-2xl font-sans text-sm leading-relaxed tracking-wide text-gray-400 sm:text-base">
          I build privacy-preserving backend systems with <span className="text-gray-300">Rust (Axum)</span>,{" "}
          <span className="text-gray-300">Circom</span>, and <span className="text-gray-300">Solana</span>.
          Currently shipping the <span className="text-purple-300">Private Bridge for web apps</span> and the{" "}
          <span className="text-purple-300">ZKP Phase 2 trusted-setup ceremony</span> at Umbra Privacy.
          Comfortable across the stack — APIs, distributed systems, smart contracts, and the cryptography
          that underpins them.
        </p>

        {/* Highlights */}
        <div className="space-y-1">
          {highlights.map((highlight, index) => (
            <p
              key={index}
              className="font-mono text-sm leading-relaxed tracking-wide text-gray-400 sm:text-base"
            >
              {highlight}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
