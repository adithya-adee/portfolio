"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Clock10 } from "lucide-react";

export default function HeroMinimal() {
  const [currentTime, setCurrentTime] = useState("");

  const highlights = [
    "Built and shipped Crab-Clean CLI tool (900+ downloads) with 90% faster SHA256 hashing",
    "Top 11th across 500+ contributors in IEEE Summer of Code for open-source contributions",
    // "Won 2 hackathons building scalable full-stack applications",
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
            <div className="relative">
              <Image
                src="/profile.png"
                alt="Adithya Anand"
                width={64}
                height={64}
                className="rounded-full ring-2 ring-neutral-800"
              />
              <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" title="Available for work" />
              </div>
            </div>
            <div className="space-y-1 sm:space-y-0.5">
              <h1 className="font-mono text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-2xl">
                Adithya Anand
              </h1>
              <div className="flex flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                <p className="text-sm tracking-wide text-gray-400 sm:text-base">@glitchy_moon</p>
                <div className="flex -translate-y-[1px] items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-[3px] text-[11px] font-medium tracking-wide text-green-400 ring-1 ring-inset ring-green-500/20 sm:translate-y-0 sm:text-xs">
                  <div className="h-1.5 w-1.5 flex-none rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  Available for work
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md border border-zinc-700/40 bg-neutral-900/40 px-3 py-1.5">
            <Clock10 className="h-3.5 w-3.5 text-gray-400 sm:h-4 sm:w-4" />
            <p className="m-0 text-xs font-medium tracking-wide text-gray-300 sm:text-sm">
              {currentTime} GMT+5:30
            </p>
          </div>
        </div>

        {/* Subtitle */}
        <div className="flex flex-wrap items-center gap-2 font-sans text-base leading-relaxed tracking-wide sm:text-lg">
          <span className="text-gray-300">
            <span className="font-semibold text-white">Backend Dev</span> by day {" | "}
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text font-semibold text-transparent">
              Solana Dev
            </span>{" "}
            by night
          </span>
        </div>

        {/* Bio */}
        <p className="max-w-2xl font-sans text-sm leading-relaxed tracking-wide text-gray-400 sm:text-base">
          Building scalable backend systems with Rust, TypeScript, and modern frameworks. Passionate
          about cryptography, blockchain, and creating efficient solutions. Currently exploring
          Solana and Web3 while shipping full-stack products.
        </p>

        {/* Highlights */}
        <div className="space-y-1.5">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="flex items-start gap-2.5 font-mono text-sm leading-relaxed tracking-wide text-gray-400 sm:text-base"
            >
              <span className="mt-1 text-xs text-purple-400/80">→</span>
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
