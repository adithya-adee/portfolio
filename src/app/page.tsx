"use client";

import dynamic from "next/dynamic";
// Import Minimal Components
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Blogs from "@/components/sections/Blogs";
import ExperienceCollapsed from "@/components/sections/ExperienceCollapsed";
import Connect from "@/components/sections/Connect";

// VisitorCounter sits below the fold + hits an API on mount. Lazy-load it so
// it doesn't block initial JS or fire the request until the user actually
// reaches it.
const VisitorCounter = dynamic(() => import("@/components/VisitorCounter"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="space-y-8 sm:space-y-10 md:space-y-12">
        {/* Hero Section */}
        <section id="about">
          <Hero />
        </section>

        {/* Experience Section - Collapsed */}
        <section id="experience">
          <ExperienceCollapsed />
        </section>

        {/* Projects Section */}
        <section id="projects">
          <Projects />
        </section>

        {/* Tech Stack Section */}
        <section id="stack">
          <TechStack />
        </section>

        {/* Blogs Section */}
        <section id="blogs">
          <Blogs />
        </section>

        {/* Connect with Me Section */}
        <section id="contact">
          <Connect />
        </section>

        {/* Visitor Counter */}
        <VisitorCounter />

        {/* Footer */}
        <footer className="mx-auto mt-16 max-w-3xl px-4 pb-8 sm:px-6">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          <div className="mt-8 flex flex-col items-center justify-between gap-3 font-mono text-label tracking-wide text-tertiary sm:flex-row sm:gap-4">
            <p suppressHydrationWarning>
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p className="flex items-center gap-2 uppercase tracking-[0.15em] text-tertiary">
              <span aria-hidden="true" className="inline-block h-1 w-2 bg-accent" />
              built in v6 noir · 2026
            </p>
            <p suppressHydrationWarning>{Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
