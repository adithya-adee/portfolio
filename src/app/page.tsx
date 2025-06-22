"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Import Page Sections
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import BlogSection from "@/components/sections/blog";

export default function Home() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen py-8 px-4 max-w-4xl mx-auto">
      <div className="sticky top-4 z-50">
        <Navbar
          isNavExpanded={isNavExpanded}
          setIsNavExpanded={setIsNavExpanded}
        />
      </div>

      <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
        {/* Hero Section (Profile) */}
        <section id="intro" className="mb-24">
          <Hero />
        </section>

        {/* About Section */}
        <section id="about" className="mb-24">
          <About />
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-24">
          <Experience />
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-24">
          <Projects />
        </section>

        {/* Skills/Stack Section */}
        <section id="stack" className="mb-24">
          <Skills />
        </section>

        {/* Education Section */}
        <section id="education" className="mb-24">
          <Education />
        </section>

        {/* Blog Section */}
        <section id="blog" className="mb-24">
          <BlogSection />
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-24">
          <Contact />
        </section>
      </motion.div>
    </div>
  );
}
