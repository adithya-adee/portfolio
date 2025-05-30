"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";

interface NavbarProps {
  isNavExpanded: boolean;
  setIsNavExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({
  isNavExpanded,
  setIsNavExpanded,
}: NavbarProps) {
  // Different variants for mobile and desktop
  const navVariants = {
    hidden: { opacity: 0, scale: 0.9, originY: 0, originX: "center" },
    visible: {
      opacity: 1,
      scale: 1,
      originY: 0,
      originX: "center",
    },
    exit: { opacity: 0, scale: 0.9 },
  };

  const toggleNav = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  return (
    <div className="relative mb-12 flex justify-center">
      {/* The "+" button is always rendered but hidden when menu is expanded */}
      <div className="relative">
        <motion.button
          onClick={toggleNav}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`w-12 h-12 flex items-center justify-center text-xl rounded-full bg-neutral-800 shadow-lg z-10 ${
            isNavExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          aria-label="Expand navigation"
        >
          <Plus size={24} />
        </motion.button>

        {/* AnimatePresence for smooth mounting/unmounting */}
        <AnimatePresence>
          {isNavExpanded && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={navVariants}
              className="bg-neutral-800 rounded-xl sm:rounded-full overflow-hidden shadow-lg 
                fixed top-1/4 left-1/2 -translate-x-1/2
                sm:absolute sm:top-0 
                w-[280px] sm:w-auto z-50"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.nav
                className="flex flex-col sm:flex-row items-center px-4 py-6 sm:py-2 rounded-xl sm:rounded-full bg-neutral-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {/* Close button at top for mobile */}
                <motion.button
                  onClick={toggleNav}
                  className="sm:hidden w-full flex justify-center mb-4"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={24} />
                </motion.button>

                <a
                  href="#intro"
                  onClick={() => setIsNavExpanded(false)}
                  className="px-3 py-3 sm:py-1 w-full text-center sm:w-auto hover:text-gray-300 transition"
                >
                  Intro
                </a>
                <a
                  href="#about"
                  onClick={() => setIsNavExpanded(false)}
                  className="px-3 py-3 sm:py-1 w-full text-center sm:w-auto hover:text-gray-300 transition"
                >
                  About
                </a>
                <a
                  href="#projects"
                  onClick={() => setIsNavExpanded(false)}
                  className="px-3 py-3 sm:py-1 w-full text-center sm:w-auto hover:text-gray-300 transition"
                >
                  Projects
                </a>
                <a
                  href="#experience"
                  onClick={() => setIsNavExpanded(false)}
                  className="px-3 py-3 sm:py-1 w-full text-center sm:w-auto hover:text-gray-300 transition"
                >
                  Experience
                </a>

                {/* X button only visible on desktop */}
                <motion.button
                  onClick={toggleNav}
                  className="px-3 py-1 hidden sm:block hover:text-gray-300 transition"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={18} />
                </motion.button>

                <a
                  href="#education"
                  onClick={() => setIsNavExpanded(false)}
                  className="px-3 py-3 sm:py-1 w-full text-center sm:w-auto hover:text-gray-300 transition"
                >
                  Education
                </a>
                <a
                  href="#stack"
                  onClick={() => setIsNavExpanded(false)}
                  className="px-3 py-3 sm:py-1 w-full text-center sm:w-auto hover:text-gray-300 transition"
                >
                  Stack
                </a>
                <a
                  href="#blog"
                  onClick={() => setIsNavExpanded(false)}
                  className="px-3 py-3 sm:py-1 w-full text-center sm:w-auto hover:text-gray-300 transition"
                >
                  Blog
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsNavExpanded(false)}
                  className="px-3 py-3 sm:py-1 w-full text-center sm:w-auto hover:text-gray-300 transition"
                >
                  Contact
                </a>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Overlay for mobile when menu is expanded */}
      <AnimatePresence>
        {isNavExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setIsNavExpanded(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
