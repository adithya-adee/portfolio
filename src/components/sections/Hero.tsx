"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { FaTwitter, FaReddit, FaLinkedin, FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { Inter, JetBrains_Mono } from "next/font/google";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

interface HeroProps {
  isMobile?: boolean;
}

export default function HeroSection({ isMobile }: HeroProps) {
  const socialLinks = [
    {
      icon: <FaGithub size={18} />,
      link: "https://github.com/adithya-adee",
      label: "GitHub",
    },
    {
      icon: <FaTwitter size={18} />,
      link: "https://x.com/AdithyaA593326",
      label: "Twitter",
    },
    {
      icon: <FaReddit size={18} />,
      link: "https://www.reddit.com/user/Glithcy_moon_69/",
      label: "Reddit",
    },
    {
      icon: <FaLinkedin size={18} />,
      link: "https://linkedin.com/in/adithya-a-8bb28128a",
      label: "LinkedIn",
    },
  ];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if not typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toLowerCase();

      if (key === "c") {
        // Copy email to clipboard
        navigator.clipboard.writeText("adithya25905@gmail.com");
        // Optional: Show a toast notification here
      } else if (key === "g") {
        // Go to GitHub
        window.open("https://github.com/adithya-adee", "_blank");
      } else if (key === "x") {
        // Go to Twitter/X
        window.open("https://x.com/AdithyaA593326", "_blank");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <section className={`max-w-4xl mx-auto ${isMobile ? "px-4 py-8" : "px-6 py-16"} mt-20`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Brand Identifier */}
        <div className="space-y-3">
          <p className={`${inter.className} text-gray-400 text-sm uppercase tracking-wider`}>
            @glitchy_moon
          </p>
          <h1
            className={`${jetbrains.className} ${
              isMobile ? "text-4xl" : "text-5xl lg:text-6xl"
            } font-bold text-white tracking-tight`}
          >
            Adithya Anand
          </h1>
          <p className={`${inter.className} text-gray-400 ${isMobile ? "text-base" : "text-lg"} leading-relaxed`}>
            3rd year @ NITK Surathkal | Backend Developer
          </p>
        </div>

        {/* Bio */}
        <div className={`${inter.className} space-y-4 text-gray-300 ${isMobile ? "text-sm" : "text-base"} max-w-2xl`}>
          <p className="leading-relaxed">
            I build scalable backend systems and explore cryptography. Currently learning Solana and building cool stuff with Rust and Web3 technologies.
          </p>
          <p className="leading-relaxed">
            I have 1 year of professional experience as a backend developer. I enjoy solving complex problems and creating efficient solutions.
          </p>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
          <a
            href="mailto:adithya25905@gmail.com"
            className={`${inter.className} inline-flex items-center text-gray-400 hover:text-white transition-colors group w-fit`}
          >
            <HiOutlineMail className="mr-2 group-hover:scale-110 transition-transform" size={20} />
            adithya25905@gmail.com
          </a>

          {/* Keyboard Shortcuts */}
          <div className={`${inter.className} text-gray-500 text-xs space-x-4`}>
            <span>Press <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-gray-400">C</kbd> to copy email</span>
            <span>Press <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-gray-400">G</kbd> for GitHub</span>
            <span>Press <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-gray-400">X</kbd> for Twitter</span>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                whileHover={!isMobile ? { scale: 1.05, y: -2 } : undefined}
                whileTap={{ scale: 0.95 }}
                title={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
