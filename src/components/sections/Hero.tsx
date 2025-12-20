"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroMinimal() {
  const [currentTime, setCurrentTime] = useState("");

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
    <section className="mx-auto mt-16 max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <div className="flex justify-between border-neutral-800/50">
          {/* EST */}
          <p className="text-xs tracking-wider text-gray-500 uppercase">EST. 2005</p>

          {/* Time & Timezone */}
          <p className="text-xs text-gray-500">
            {currentTime} <span className="text-gray-600">IST (GMT+5:30)</span>
          </p>
        </div>
        {/* Name & Handle */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Adithya Anand
          </h1>
          <p className="text-sm text-gray-400">@glitchy_moon</p>
        </div>

        {/* Subtitle */}
        <p className="max-w-xl text-base leading-relaxed text-gray-300">
          3rd year @ NITK Surathkal | Backend Developer
        </p>

        {/* Bio - Compressed */}
        <div className="max-w-xl space-y-2 text-sm text-gray-400">
          <p>
            I build scalable backend systems and products. Passionate about cryptography,
            blockchain, and creating efficient solutions that solve real problems.
          </p>
          <p>
            Currently exploring Solana and Web3 tech while working on full-stack projects with Rust,
            TypeScript, and modern frameworks.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
