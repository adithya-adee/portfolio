"use client";

import dynamic from "next/dynamic";
// Import Minimal Components
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Blogs from "@/components/sections/Blogs";
import ExperienceCollapsed from "@/components/sections/ExperienceCollapsed";
import Connect from "@/components/sections/Connect";
import { SectionDivider } from "@/components/motion";

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

        <SectionDivider />

        {/* Experience Section - Collapsed */}
        <section id="experience">
          <ExperienceCollapsed />
        </section>

        <SectionDivider />

        {/* Projects Section */}
        <section id="projects">
          <Projects />
        </section>

        <SectionDivider />

        {/* Tech Stack Section */}
        <section id="stack">
          <TechStack />
        </section>

        <SectionDivider />

        {/* Blogs Section */}
        <section id="blogs">
          <Blogs />
        </section>

        <SectionDivider />

        {/* Connect with Me Section */}
        <section id="contact">
          <Connect />
        </section>

        {/* Visitor Counter */}
        <VisitorCounter />

        {/* Footer */}
        <footer className="mx-auto mt-16 max-w-3xl px-4 pb-8 sm:px-6">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          <div className="mt-8 flex flex-col items-center justify-between gap-2 font-mono text-label tracking-wide text-tertiary sm:flex-row sm:gap-4">
            <p suppressHydrationWarning>
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p suppressHydrationWarning>{Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
