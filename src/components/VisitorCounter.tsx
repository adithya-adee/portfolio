"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { CountUp, Reveal } from "@/components/motion";

interface VisitData {
  totalVisits: number;
}

const VISIT_COUNTED_KEY = "portfolio_visit_counted";

export default function VisitorCounter() {
  const [visitData, setVisitData] = useState<VisitData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const trackVisit = async () => {
      try {
        const hasBeenCounted = sessionStorage.getItem(VISIT_COUNTED_KEY);
        let data: VisitData;
        if (hasBeenCounted) {
          const response = await fetch("/api/visits");
          data = await response.json();
        } else {
          const response = await fetch("/api/visits", { method: "POST" });
          data = await response.json();
          sessionStorage.setItem(VISIT_COUNTED_KEY, "true");
        }
        setVisitData(data);
      } catch (error) {
        console.error("Failed to track visit:", error);
      } finally {
        setIsLoading(false);
      }
    };

    trackVisit();
  }, []);

  if (!isMounted) return null;

  if (isLoading) {
    return (
      <div className="mx-auto mb-8 flex max-w-3xl items-center justify-center px-4 sm:px-6">
        <div className="flex items-center gap-2 rounded-full border border-soft bg-surface-1 px-4 py-2 backdrop-blur-sm">
          <div className="h-4 w-4 animate-pulse rounded-full bg-gray-700" />
          <div className="h-4 w-16 animate-pulse rounded bg-gray-700" />
        </div>
      </div>
    );
  }

  if (!visitData) return null;

  return (
    <div className="mx-auto mb-8 flex max-w-3xl items-center justify-center px-4 sm:px-6">
      <Reveal y={10}>
        <div
          className="group flex items-center gap-3 rounded-full border border-soft bg-surface-1 px-5 py-2.5 shadow-elev-1 backdrop-blur-sm transition-all duration-base ease-out-soft hover:-translate-y-0.5 hover:border-strong hover:shadow-elev-2"
          title={`${visitData.totalVisits.toLocaleString()} total visits`}
        >
          <Eye aria-hidden="true" className="h-4 w-4 text-gray-400" />

          <div className="flex items-baseline gap-1.5 font-mono text-mono">
            <span className="text-gray-500">You&apos;re visitor</span>
            <CountUp
              value={visitData.totalVisits}
              className="font-semibold tabular-nums text-gray-100"
            />
          </div>

          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
        </div>
      </Reveal>
    </div>
  );
}
