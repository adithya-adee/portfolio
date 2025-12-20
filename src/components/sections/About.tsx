"use client";

import { motion } from "framer-motion";

export default function AboutMinimal() {
  const highlights = [
    "Built and shipped Crab-Clean CLI tool (540+ downloads) with 90% faster SHA256 hashing",
    "Top 10% nationally in IEEE Summer of Code for open-source contributions",
    "Won 2 hackathons building scalable full-stack applications",
  ];

  return (
    <section className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <h2 className="mb-6 text-sm font-medium text-gray-400">About</h2>

      <div className="space-y-4">
        {/* Main Description */}
        <p className="text-sm leading-relaxed text-gray-300">
          I&apos;m passionate about building products that solve real problems. My focus is on
          creating scalable backend systems, exploring cryptography and blockchain technology, and
          contributing to open-source projects.
        </p>

        {/* Highlights */}
        <div className="pt-4">
          <p className="mb-3 text-xs tracking-wider text-gray-500 uppercase">Highlights</p>
          <ul className="space-y-2">
            {highlights.map((highlight, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-2 text-sm text-gray-400"
              >
                <span className="mt-0.5 text-gray-600">•</span>
                <span>{highlight}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
