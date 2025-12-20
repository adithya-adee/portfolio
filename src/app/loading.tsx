"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loading() {
  const [loadingText, setLoadingText] = useState("Initializing");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    // Listen for resize events
    window.addEventListener("resize", checkMobile);

    const texts = [
      "Initializing...",
      "Loading components...",
      "Preparing experience...",
      "Almost ready...",
    ];

    let index = 0;
    const interval = setInterval(() => {
      setLoadingText(texts[index]);
      index = (index + 1) % texts.length;
    }, 1000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Mobile loading component
  if (isMobile) {
    return (
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4">
        {/* Minimal background pattern for mobile */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:2rem_2rem]" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Lightweight mobile spinner */}
          <div className="relative mb-6 h-20 w-20">
            <motion.div
              className="h-20 w-20 rounded-full border-2 border-transparent border-t-blue-400 border-r-purple-500"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border border-transparent border-t-purple-400/50 border-l-blue-400/50"
              animate={{ rotate: -360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text font-mono text-xl font-bold text-transparent"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                &lt;/&gt;
              </motion.div>
            </div>
          </div>

          {/* Loading dots */}
          <div className="mb-4 flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ scale: 0.8, opacity: 0.3 }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Loading text */}
          <motion.p
            className="text-center text-xs font-medium text-neutral-300"
            key={loadingText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {loadingText}
          </motion.p>

          {/* Minimal progress bar */}
          <div className="mt-4 h-0.5 w-32 overflow-hidden rounded-full bg-neutral-800">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Desktop loading component (unchanged)
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-blue-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="relative h-72 w-72">
          <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-xl border border-neutral-800/50 bg-black/40 backdrop-blur-sm">
            {/* Animated terminal cursor */}
            <motion.div
              className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-[length:200%_100%] bg-clip-text font-mono text-5xl font-bold text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              &lt;/&gt;
            </motion.div>

            {/* Rotating loading ring */}
            <motion.div
              className="absolute inset-4 rounded-full border-2 border-transparent border-t-blue-400/50 border-r-purple-500/50"
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        </div>

        {/* Enhanced loading indicator */}
        <div className="mt-8 space-y-4">
          <div className="flex justify-center gap-2">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ scale: 0.8, opacity: 0.3 }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <motion.div
            className="text-center"
            key={loadingText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm font-medium text-neutral-300">{loadingText}</p>
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-1 w-64 overflow-hidden rounded-full bg-neutral-800">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  );
}
