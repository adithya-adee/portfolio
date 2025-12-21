"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404");

  useEffect(() => {
    // Glitch effect
    const glitchChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
    const originalText = "404";
    const glitchFrequency = 3000;

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
    };
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:3rem_3rem]" />

      <div className="relative z-10 w-full max-w-sm sm:max-w-lg">
        <div className="relative">
          <div className="relative overflow-hidden rounded-xl border border-neutral-800/50 bg-black/40 p-6 backdrop-blur-sm sm:p-8">
            {/* Terminal header */}
            <div className="absolute left-0 right-0 top-0 flex h-6 items-center border-b border-neutral-700/50 bg-neutral-900/50 px-4 sm:h-8">
              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500 sm:h-3 sm:w-3" />
                <div className="h-2 w-2 rounded-full bg-yellow-500 sm:h-3 sm:w-3" />
                <div className="h-2 w-2 rounded-full bg-green-500 sm:h-3 sm:w-3" />
              </div>
              <div className="ml-4 hidden font-mono text-xs text-neutral-400 sm:block">
                ~/error/404.tsx
              </div>
            </div>

            {/* Error code in corner - hidden on mobile */}
            <div className="absolute right-0 top-12 hidden p-4 opacity-10 sm:block">
              <pre className="font-mono text-xs text-red-400">
                {`HTTP/1.1 404 Not Found\nContent-Type: text/html\nServer: nginx/1.18.0`}
              </pre>
            </div>

            <div className="pt-6 sm:pt-8">
              <div className="mb-6 text-center">
                <h1 className="mb-2 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text font-mono text-5xl font-bold text-transparent sm:text-7xl">
                  {glitchText}
                </h1>
                <h2 className="text-xl font-semibold text-white sm:text-2xl">Page Not Found</h2>
                <div className="mx-auto mt-2 h-0.5 w-16 rounded-full bg-gradient-to-r from-orange-400 to-red-500 sm:h-1 sm:w-20" />
              </div>

              <p className="mb-8 text-center text-sm leading-relaxed text-neutral-300 sm:text-base">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link href="/" className="flex-1">
                  <Button className="h-12 w-full bg-gradient-to-r from-orange-500 to-red-500 text-sm font-medium text-white hover:from-orange-600 hover:to-red-600 sm:text-base">
                    ← Back to Home
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="h-12 flex-1 border-neutral-600 text-sm text-neutral-300 hover:bg-neutral-800 sm:text-base"
                  onClick={() => window.history.back()}
                >
                  Go Back
                </Button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-orange-500/5 blur-2xl sm:h-32 sm:w-32" />
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-red-500/5 blur-2xl sm:h-40 sm:w-40" />
            <div className="absolute left-1/2 top-1/2 -z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-orange-500/5 to-red-500/5 blur-3xl sm:h-64 sm:w-64" />
          </div>
        </div>
      </div>

      {/* Code display */}
      <div className="mt-6 w-full max-w-sm rounded-lg border border-neutral-800/50 bg-black/40 p-4 font-mono text-sm text-neutral-400 backdrop-blur-sm sm:mt-8 sm:max-w-lg sm:p-6">
        <div className="mb-3 flex items-center gap-2 text-xs text-neutral-500">
          <div className="h-2 w-2 rounded-full bg-red-400" />
          <span>Error Log</span>
        </div>
        <pre className="overflow-x-auto text-xs leading-relaxed">
          {`try {\n  const page = await fetchPage(route);\n} catch (error) {\n  throw new Error('404 - Page not found');\n}`}
        </pre>
      </div>

      {/* Mobile-specific indicator */}
      <div className="mt-4 text-center sm:hidden">
        <div className="text-xs text-neutral-500">• • •</div>
      </div>
    </div>
  );
}
