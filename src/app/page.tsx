"use client";

// Import Minimal Components
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import ExperienceCollapsed from "@/components/sections/ExperienceCollapsed";
import Connect from "@/components/sections/Connect";

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

        {/* Connect with Me Section */}
        <section id="contact">
          <Connect />
        </section>

        {/* Footer */}
        <footer className="mx-auto max-w-3xl border-t border-neutral-800/50 px-4 py-8 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-2 text-sm tracking-wide text-gray-500 sm:flex-row sm:gap-4">
            <p>Sat, Dec 21, 2025</p>
            <p>Asia/Calcutta</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
