"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProjectDetailPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to main projects page since we've simplified to a minimal structure
    router.push("/#projects");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-gray-400">Redirecting...</p>
    </div>
  );
}
