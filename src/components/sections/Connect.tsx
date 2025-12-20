"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: <Linkedin size={18} />,
    url: "https://linkedin.com/in/adithya-a-8bb28128a",
  },
  {
    name: "GitHub",
    icon: <Github size={18} />,
    url: "https://github.com/adithya-adee",
  },
  {
    name: "Twitter",
    icon: <Twitter size={18} />,
    url: "https://x.com/AdithyaA593326",
  },
  {
    name: "Email",
    icon: <Mail size={18} />,
    url: "mailto:adithya25905@gmail.com",
  },
  {
    name: "Peerlist",
    icon: <span className="text-sm font-semibold">P</span>,
    url: "#", // Add your Peerlist URL
  },
];

export default function ConnectWithMe() {
  // Email copy shortcut
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key.toLowerCase() === "c") {
        navigator.clipboard.writeText("adithya25905@gmail.com");
        toast.success("Email copied to clipboard!", {
          description: "adithya25905@gmail.com",
          duration: 2000,
        });
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <section className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <h2 className="mb-6 text-sm font-medium text-gray-400">Connect with Me</h2>

      <div className="space-y-4">
        {/* Email with keyboard hint */}
        <div>
          <a
            href="mailto:adithya25905@gmail.com"
            className="inline-block text-sm text-gray-300 transition-colors hover:text-white"
          >
            adithya25905@gmail.com
          </a>
          <p className="mt-1 text-xs text-gray-600">
            Press{" "}
            <kbd className="rounded border border-neutral-700/50 bg-neutral-800/50 px-1.5 py-0.5 text-gray-500">
              C
            </kbd>{" "}
            to copy my email
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap gap-3 pt-2">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2 rounded-md border border-neutral-800/50 bg-neutral-900/30 px-3 py-2 text-sm text-gray-400 transition-all hover:border-neutral-700 hover:text-white"
            >
              {link.icon}
              <span>{link.name}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
