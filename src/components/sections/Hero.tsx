"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroMinimal() {
  const [currentTime, setCurrentTime] = useState("");

  const highlights = [
    "Built and shipped Crab-Clean CLI tool (540+ downloads) with 90% faster SHA256 hashing",
    "Top 10% nationally in IEEE Summer of Code for open-source contributions",
    "Won 2 hackathons building scalable full-stack applications",
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
    <section className="mx-auto mt-16 max-w-2xl px-4 sm:px-3 sm:pt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-2"
      >
        <div className="flex justify-between border-neutral-800/50">
          {/* EST */}
          <p className="text-sm uppercase tracking-wider text-gray-500">EST. 2005</p>

          {/* Time & Timezone */}
          <p className="text-sm text-gray-500">
            {currentTime} <span className="text-gray-600">IST (GMT+5:30)</span>
          </p>
        </div>
        {/* Name & Handle */}
        <div className="space-y-1">
          <p className="text-md font-bold tracking-tight text-white sm:text-4xl">Adithya Anand</p>
          <p className="text-sm text-gray-400">@glitchy_moon</p>
        </div>

        {/* Subtitle */}
        <p className="max-w-xl text-lg leading-relaxed text-gray-300">
          Backend Developer | Building Solana Products
        </p>

        {/* Bio*/}
        <p className="text-md max-w-xl pt-2 leading-relaxed text-gray-400">
          Building scalable backend systems with Rust, TypeScript, and modern frameworks. Passionate
          about cryptography, blockchain, and creating efficient solutions. Currently exploring
          Solana and Web3 while shipping full-stack products.
        </p>

        {/* Highlights */}
        <div className="pt-2 text-base text-gray-400">
          {highlights.map((highlight, index) => (
            <span key={index}>
              {highlight}
              {index < highlights.length - 1 ? " • " : ""}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
