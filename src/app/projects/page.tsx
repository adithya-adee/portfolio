"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProjectsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to main page with projects section
    router.push("/#projects");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-gray-400">Redirecting...</p>
    </div>
  );
}
