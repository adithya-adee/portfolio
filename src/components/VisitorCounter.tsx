"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

interface VisitData {
  totalVisits: number;
}

const VISIT_COUNTED_KEY = "portfolio_visit_counted";

export default function VisitorCounter() {
  const [visitData, setVisitData] = useState<VisitData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const trackVisit = async () => {
      try {
        // Check if this tab has already been counted
        const hasBeenCounted = sessionStorage.getItem(VISIT_COUNTED_KEY);

        let data: VisitData;

        if (hasBeenCounted) {
          // Just fetch current count, don't increment
          const response = await fetch("/api/visits");
          data = await response.json();
        } else {
          // First visit in this tab - increment counter
          const response = await fetch("/api/visits", {
            method: "POST",
          });
          data = await response.json();
          
          // Mark this tab as counted
          sessionStorage.setItem(VISIT_COUNTED_KEY, "true");
        }

        setVisitData(data);

        // Animate counter from 0 to actual value
        const duration = 500; // .5 second
        const steps = 30;
        const increment = data.totalVisits / steps;
        let current = 0;

        const interval = setInterval(() => {
          current += increment;
          if (current >= data.totalVisits) {
            setDisplayCount(data.totalVisits);
            clearInterval(interval);
          } else {
            setDisplayCount(Math.floor(current));
          }
        }, duration / steps);
      } catch (error) {
        console.error("Failed to track visit:", error);
      } finally {
        setIsLoading(false);
      }
    };

    trackVisit();
  }, []);

  // Prevent hydration errors by not rendering until mounted
  if (!isMounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="mx-auto mb-8 flex max-w-3xl items-center justify-center px-4 sm:px-6">
        <div className="flex items-center gap-2 rounded-full border border-neutral-800/50 bg-neutral-900/80 px-4 py-2 backdrop-blur-sm">
          <div className="h-4 w-4 animate-pulse rounded-full bg-neutral-700" />
          <div className="h-4 w-16 animate-pulse rounded bg-neutral-700" />
        </div>
      </div>
    );
  }

  if (!visitData) {
    return null;
  }

  return (
    <div className="mx-auto mb-8 flex max-w-3xl items-center justify-center px-4 sm:px-6">
      <div
        className="group flex items-center gap-2.5 rounded-full border border-neutral-800/50 bg-neutral-900/90 px-4 py-2.5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-neutral-700/60 hover:bg-neutral-900/95 hover:shadow-xl sm:gap-3 sm:px-5 sm:py-3"
        title={`${visitData.totalVisits} total visits`}
      >
        {/* Eye Icon */}
        <Eye className="h-4 w-4 text-neutral-400 sm:h-4 sm:w-4" />

        {/* Counter */}
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono text-sm font-semibold tracking-tight text-neutral-100 sm:text-base">
          <span className="text-sm text-neutral-500">You are the reason we hit </span>
             {displayCount.toLocaleString()}
          </span>
          <span className="text-sm text-neutral-500">visits</span>
        </div>

        {/* Live Indicator - Simple static dot, no animation */}
        <div className="ml-1 h-1.5 w-1.5 rounded-full bg-green-500" />
      </div>
    </div>
  );
}

