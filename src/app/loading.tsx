"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [loadingText, setLoadingText] = useState("Initializing");

  useEffect(() => {
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
    };
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:4rem_4rem]" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Simple spinner */}
        <div className="relative mb-6 h-16 w-16 sm:mb-8 sm:h-24 sm:w-24">
          <div className="sm:border-3 spinner h-full w-full rounded-full border-2 border-transparent border-r-purple-500 border-t-blue-400" />

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text font-mono text-xl font-bold text-transparent sm:text-3xl">
              &lt;/&gt;
            </div>
          </div>
        </div>

        {/* Loading dots */}
        <div className="mb-4 flex gap-1.5 sm:gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 sm:h-2 sm:w-2"
              style={{
                animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <p className="text-center text-xs font-medium text-neutral-300 sm:text-sm">{loadingText}</p>

        {/* Progress bar */}
        <div className="mt-4 h-0.5 w-32 overflow-hidden rounded-full bg-neutral-800 sm:mt-6 sm:h-1 sm:w-64">
          <div className="progress-bar h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-500" />
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(0.8);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .spinner {
          animation: spin 1.5s linear infinite;
        }

        .progress-bar {
          animation: progress 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
