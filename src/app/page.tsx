"use client";

import { motion } from "framer-motion";

// Import Minimal Components
import SmartNavbar from "@/components/SmartNavbar";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import ExperienceCollapsed from "@/components/sections/ExperienceCollapsed";
import Connect from "@/components/sections/Connect";

export default function Home() {
  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <SmartNavbar />

      <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
        {/* Hero Section */}
        <section id="about" className="mb-8">
          <Hero />
        </section>

        {/* Experience Section - Collapsed */}
        <section id="experience" className="mb-8">
          <ExperienceCollapsed />
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-8">
          <Projects />
        </section>

        {/* Tech Stack Section */}
        <section id="stack" className="mb-8">
          <TechStack />
        </section>

        {/* Connect with Me Section */}
        <section id="contact" className="mb-8">
          <Connect />
        </section>

        {/* Footer */}
        <footer className="mx-auto max-w-2xl border-t border-neutral-800/50 px-4 py-8 sm:px-6">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <p>Sat, Dec 21, 2025</p>
            <p>Asia/Calcutta</p>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}
