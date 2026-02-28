"use client";

// Import Minimal Components
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Blogs from "@/components/sections/Blogs";
import ExperienceCollapsed from "@/components/sections/ExperienceCollapsed";
import Connect from "@/components/sections/Connect";
import VisitorCounter from "@/components/VisitorCounter";

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
          <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
          <div className="mt-8 flex flex-col items-center justify-between gap-2 text-sm tracking-wide text-gray-500 sm:flex-row sm:gap-4">
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
