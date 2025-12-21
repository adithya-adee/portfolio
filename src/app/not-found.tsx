"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Glitch effect - reduced frequency on mobile
    const glitchChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
    const originalText = "404";
    const glitchFrequency = isMobile ? 3000 : 2000; // Less frequent on mobile

    const glitchInterval = setInterval(() => {
      let glitched = "";
      for (let i = 0; i < originalText.length; i++) {
        if (Math.random() < 0.1) {
          glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
          glitched += originalText[i];
        }
      }
      setGlitchText(glitched);
      setTimeout(() => setGlitchText(originalText), 100);
    }, glitchFrequency);

    return () => {
      clearInterval(glitchInterval);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      {/* Background grid - lighter on mobile */}
      <div
        className={`absolute inset-0 ${
          isMobile
            ? "bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:2rem_2rem]"
            : "bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]"
        }`}
      />

      {/* Floating error symbols - reduced on mobile */}
      <div className="pointer-events-none absolute inset-0">
        {(isMobile ? ["×", "!"] : ["×", "!", "?", "⚠", "404"]).map((symbol, i) => (
          <motion.div
            key={i}
            className={`absolute text-red-500/10 ${isMobile ? "text-lg" : "text-2xl"} font-bold`}
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, isMobile ? -30 : -50, 0],
              rotate: [0, 180, 360],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: isMobile ? 6 : 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      <div className={`relative z-10 w-full ${isMobile ? "max-w-sm" : "max-w-lg"}`}>
        <div className="relative">
          <div
            className={`rounded-xl border border-neutral-800/50 bg-black/40 backdrop-blur-sm ${
              isMobile ? "p-6" : "p-8"
            } relative overflow-hidden`}
          >
            {/* Terminal header - simplified for mobile */}
            <div
              className={`absolute left-0 right-0 top-0 ${
                isMobile ? "h-6" : "h-8"
              } flex items-center border-b border-neutral-700/50 bg-neutral-900/50 px-4`}
            >
              <div className="flex gap-2">
                <div className={`${isMobile ? "h-2 w-2" : "h-3 w-3"} rounded-full bg-red-500`} />
                <div className={`${isMobile ? "h-2 w-2" : "h-3 w-3"} rounded-full bg-yellow-500`} />
                <div className={`${isMobile ? "h-2 w-2" : "h-3 w-3"} rounded-full bg-green-500`} />
              </div>
              {!isMobile && (
                <div className="ml-4 font-mono text-xs text-neutral-400">~/error/404.tsx</div>
              )}
            </div>

            {/* Error code in corner - hidden on mobile */}
            {!isMobile && (
              <div className="absolute right-0 top-12 p-4 opacity-10">
                <pre className="font-mono text-xs text-red-400">
                  {`HTTP/1.1 404 Not Found\nContent-Type: text/html\nServer: nginx/1.18.0`}
                </pre>
              </div>
            )}

            <div className={isMobile ? "pt-6" : "pt-8"}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 text-center"
              >
                <h1
                  className={`${
                    isMobile ? "text-5xl" : "text-7xl"
                  } mb-2 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text font-mono font-bold text-transparent`}
                >
                  {glitchText}
                </h1>
                <h2 className={`${isMobile ? "text-xl" : "text-2xl"} font-semibold text-white`}>
                  Page Not Found
                </h2>
                <div
                  className={`${
                    isMobile ? "h-0.5 w-16" : "h-1 w-20"
                  } mx-auto mt-2 rounded-full bg-gradient-to-r from-orange-400 to-red-500`}
                />
              </motion.div>

              <motion.p
                className={`mb-8 text-center leading-relaxed text-neutral-300 ${
                  isMobile ? "text-sm" : "text-base"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {isMobile
                  ? "The page you're looking for doesn't exist or has been moved."
                  : "The requested resource could not be found on this server. It might have been moved, deleted, or you entered the wrong URL."}
              </motion.p>

              <motion.div
                className={`flex ${
                  isMobile ? "flex-col" : "flex-col sm:flex-row"
                } gap-${isMobile ? "3" : "4"}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Link href="/" className="flex-1">
                  <Button
                    className={`w-full bg-gradient-to-r from-orange-500 to-red-500 font-medium text-white hover:from-orange-600 hover:to-red-600 ${
                      isMobile ? "h-12 text-sm" : ""
                    }`}
                    size={isMobile ? "default" : "lg"}
                  >
                    ← {isMobile ? "Home" : "Back to Home"}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className={`flex-1 border-neutral-600 text-neutral-300 hover:bg-neutral-800 ${
                    isMobile ? "h-12 text-sm" : ""
                  }`}
                  size={isMobile ? "default" : "lg"}
                  onClick={() => window.history.back()}
                >
                  Go Back
                </Button>
              </motion.div>
            </div>

            {/* Enhanced decorative elements - reduced on mobile */}
            <div
              className={`absolute -bottom-6 -left-6 ${
                isMobile ? "h-20 w-20" : "h-32 w-32"
              } rounded-full bg-orange-500/5 blur-2xl`}
            />
            <div
              className={`absolute -right-6 -top-6 ${
                isMobile ? "h-24 w-24" : "h-40 w-40"
              } rounded-full bg-red-500/5 blur-2xl`}
            />
            <div
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform ${
                isMobile ? "h-40 w-40" : "h-64 w-64"
              } -z-10 rounded-full bg-gradient-to-r from-orange-500/5 to-red-500/5 blur-3xl`}
            />
          </div>
        </div>
      </div>

      {/* Enhanced code display - simplified for mobile */}
      <motion.div
        className={`mt-${isMobile ? "6" : "8"} font-mono text-sm text-neutral-400 ${
          isMobile ? "p-4" : "p-6"
        } rounded-lg border border-neutral-800/50 bg-black/40 backdrop-blur-sm ${
          isMobile ? "max-w-sm" : "max-w-lg"
        } w-full`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div
          className={`mb-3 flex items-center gap-2 ${
            isMobile ? "text-xs" : "text-xs"
          } text-neutral-500`}
        >
          <div className="h-2 w-2 rounded-full bg-red-400" />
          <span>Error Log</span>
        </div>
        <pre className={`${isMobile ? "text-xs" : "text-xs"} overflow-x-auto leading-relaxed`}>
          {isMobile
            ? `try {
  const page = await fetchPage(route);
} catch (error) {
  throw new Error('404');
}`
            : `try {
  const page = await fetchPage(route);
  return page;
} catch (error) {
  throw new Error('Page not found');
}`}
        </pre>
      </motion.div>

      {/* Mobile-specific back to top indicator */}
      {isMobile && (
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="text-xs text-neutral-500">• • •</div>
        </motion.div>
      )}
    </div>
  );
}
