"use client";

import { motion } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404");

  useEffect(() => {
    const glitchChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
    const originalText = "404";

    const glitchInterval = setInterval(() => {
      let glitched = "";
      for (let i = 0; i < originalText.length; i++) {
        if (Math.random() < 0.1) {
          glitched +=
            glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
          glitched += originalText[i];
        }
      }
      setGlitchText(glitched);

      setTimeout(() => setGlitchText(originalText), 100);
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      {/* Floating error symbols */}
      <div className="absolute inset-0 pointer-events-none">
        {["×", "!", "?", "⚠", "404"].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-red-500/10 text-2xl font-bold"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="relative">
          <BorderBeam
            size={120}
            duration={6}
            colorFrom="#f97316"
            colorTo="#ef4444"
          />

          <div className="bg-black/40 backdrop-blur-sm border border-neutral-800/50 rounded-xl p-8 relative overflow-hidden">
            {/* Terminal header */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-neutral-900/50 border-b border-neutral-700/50 flex items-center px-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <div className="ml-4 text-xs text-neutral-400 font-mono">
                ~/error/404.tsx
              </div>
            </div>

            {/* Error code in corner */}
            <div className="absolute top-12 right-0 p-4 opacity-10">
              <pre className="font-mono text-xs text-red-400">
                {`HTTP/1.1 404 Not Found\nContent-Type: text/html\nServer: nginx/1.18.0`}
              </pre>
            </div>

            <div className="pt-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <h1 className="text-7xl font-bold text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text mb-2 font-mono">
                  {glitchText}
                </h1>
                <h2 className="text-2xl font-semibold text-white">
                  Page Not Found
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-red-500 mt-2 rounded-full" />
              </motion.div>

              <motion.p
                className="text-neutral-300 mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                The requested resource could not be found on this server. It
                might have been moved, deleted, or you entered the wrong URL.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Link href="/" className="flex-1">
                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium"
                    size="lg"
                  >
                    ← Back to Home
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="flex-1 border-neutral-600 text-neutral-300 hover:bg-neutral-800"
                  size="lg"
                  onClick={() => window.history.back()}
                >
                  Go Back
                </Button>
              </motion.div>
            </div>

            {/* Enhanced decorative elements */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl" />
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-red-500/5 rounded-full blur-2xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>

      {/* Enhanced code display */}
      <motion.div
        className="mt-8 font-mono text-sm text-neutral-400 p-6 bg-black/40 backdrop-blur-sm border border-neutral-800/50 rounded-lg max-w-lg w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="flex items-center gap-2 mb-3 text-xs text-neutral-500">
          <div className="w-2 h-2 bg-red-400 rounded-full" />
          <span>Error Log</span>
        </div>
        <pre className="text-xs leading-relaxed">
          {`try {
  const page = await fetchPage(route);
  return page;
} catch (error) {
  throw new Error('Page not found');
}`}
        </pre>
      </motion.div>
    </div>
  );
}
