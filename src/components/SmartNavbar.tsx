"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function SmartNavbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Hide navbar when scrolling down and past 100px
        setIsVisible(false);
        setIsMobileMenuOpen(false); // Close mobile menu when scrolling
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const navLinks = [
    // { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Archive", href: "/archive" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed left-0 right-0 top-0 z-50 border-b border-neutral-700/50 bg-zinc-950/80 backdrop-blur-sm"
          style={{
            boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex items-center justify-between">
              {/* Brand */}
              <Link href="/">
                <motion.div
                  className="flex cursor-pointer flex-col"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-base font-bold text-white sm:text-lg">Adithya Anand</span>
                  <span className="text-xs text-gray-400">@glitchy_moon</span>
                </motion.div>
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden items-center gap-6 md:flex lg:gap-8">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href}>
                    <motion.span
                      className="cursor-pointer text-sm font-medium text-gray-400 transition-colors hover:text-white"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="p-2 text-white md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden md:hidden"
                >
                  <div className="mt-3 flex flex-col gap-4 border-t border-white/10">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="block text-sm font-medium text-gray-400 transition-colors hover:text-white">
                          {link.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
