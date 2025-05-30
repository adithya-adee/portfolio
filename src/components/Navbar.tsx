"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus, X } from "lucide-react";

interface NavbarProps {
  isNavExpanded: boolean;
  setIsNavExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({
  isNavExpanded,
  setIsNavExpanded,
}: NavbarProps) {
  const navVariants = {
    hidden: { opacity: 0, width: "48px" },
    visible: { opacity: 1, width: "auto" },
  };

  const toggleNav = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  return (
    <div className="relative mb-12 flex justify-center">
      {isNavExpanded ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={navVariants}
          className="bg-neutral-800 rounded-full overflow-hidden shadow-lg"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.nav
            className="flex items-center px-4 py-2 rounded-full bg-neutral-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <a
              href="#intro"
              className="px-3 py-1 hover:text-gray-300 transition"
            >
              Intro
            </a>
            <a
              href="#about"
              className="px-3 py-1 hover:text-gray-300 transition"
            >
              About
            </a>
            <a
              href="#projects"
              className="px-3 py-1 hover:text-gray-300 transition"
            >
              Projects
            </a>
            <a
              href="#experience"
              className="px-3 py-1 hover:text-gray-300 transition"
            >
              Experience
            </a>
            <motion.button
              onClick={toggleNav}
              className="px-3 py-1 hover:text-gray-300 transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={18} />
            </motion.button>
            <a
              href="#education"
              className="px-3 py-1 hover:text-gray-300 transition"
            >
              Education
            </a>
            <a
              href="#stack"
              className="px-3 py-1 hover:text-gray-300 transition"
            >
              Stack
            </a>
            <a
              href="#blog"
              className="px-3 py-1 hover:text-gray-300 transition"
            >
              Blog
            </a>
            <a
              href="#contact"
              className="px-3 py-1 hover:text-gray-300 transition"
            >
              Contact
            </a>
          </motion.nav>
        </motion.div>
      ) : (
        <motion.button
          onClick={toggleNav}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 flex items-center justify-center text-xl rounded-full bg-neutral-800 shadow-lg z-10"
          aria-label="Expand navigation"
        >
          <Plus size={24} />
        </motion.button>
      )}
    </div>
  );
}
