"use client";

import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404");

  useEffect(() => {
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
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-4">
      <div className="relative z-10 w-full max-w-sm sm:max-w-lg">
        <div className="relative">
          <div className="relative overflow-hidden rounded-xl border border-soft bg-surface-1 p-6 shadow-elev-2 backdrop-blur-sm sm:p-8">
            {/* Terminal header — kept from the original (great touch, on-vibe) */}
            <div className="absolute left-0 right-0 top-0 flex h-6 items-center border-b border-soft bg-surface-2 px-4 sm:h-8">
              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-accent sm:h-3 sm:w-3" />
                <div className="h-2 w-2 rounded-full bg-amber-400/70 sm:h-3 sm:w-3" />
                <div className="h-2 w-2 rounded-full bg-emerald-400/70 sm:h-3 sm:w-3" />
              </div>
              <div className="ml-4 hidden font-mono text-label text-tertiary sm:block">
                ~/error/404.tsx
              </div>
            </div>

            {/* Error code in corner — hidden on mobile */}
            <div className="absolute right-0 top-12 hidden p-4 opacity-20 sm:block">
              <pre className="font-mono text-label text-accent">
                {`HTTP/1.1 404 Not Found\nContent-Type: text/html\nServer: nginx/1.18.0`}
              </pre>
            </div>

            <div className="pt-6 sm:pt-8">
              <div className="mb-6 text-center">
                <h1 className="mb-2 bg-aurora bg-clip-text font-mono text-5xl font-bold text-transparent sm:text-7xl">
                  {glitchText}
                </h1>
                <h2 className="font-serif text-h1 font-normal italic text-primary">
                  Page Not Found
                </h2>
                <div className="mx-auto mt-3 h-px w-16 bg-accent sm:w-20" />
              </div>

              <p className="mb-8 text-center text-body-2 leading-relaxed text-secondary">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link href="/" className="flex-1">
                  <Button className="h-12 w-full bg-accent text-label font-medium uppercase tracking-wider text-primary transition-colors hover:bg-accent-bright">
                    ← Back to Home
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="h-12 flex-1 border-soft bg-surface-2 text-label uppercase tracking-wider text-secondary hover:border-strong hover:bg-surface-3 hover:text-primary"
                  onClick={() => window.history.back()}
                >
                  Go Back
                </Button>
              </div>
            </div>

            {/* Decorative noir glow */}
            <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-accent/10 blur-2xl sm:h-32 sm:w-32" />
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/10 blur-2xl sm:h-40 sm:w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
