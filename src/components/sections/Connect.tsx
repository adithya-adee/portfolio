"use client";

import { Github, Linkedin, Mail, Twitter, FileText, Briefcase } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";

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

const navigationLinks = [
  {
    name: "Blog",
    icon: <FileText size={18} />,
    url: "/blog",
    description: "Read my thoughts on tech and development",
  },
  {
    name: "Archive",
    icon: <Briefcase size={18} />,
    url: "/archive",
    description: "Full work experience details",
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
    <section className="mx-auto max-w-3xl px-4 py-4 sm:px-6 sm:py-6">
      <h2 className="mb-4 text-xl font-medium tracking-wide text-gray-400 sm:text-2xl">
        Connect with Me
      </h2>

      <div className="space-y-3 sm:space-y-4">
        {/* Email with keyboard hint */}
        <div className="space-y-2">
          <a
            href="mailto:adithya25905@gmail.com"
            className="inline-block text-base tracking-wide text-gray-300 transition-colors hover:text-white sm:text-lg"
          >
            adithya25905@gmail.com
          </a>
          <p className="text-sm tracking-wide text-gray-500">
            Press{" "}
            <kbd className="rounded border border-neutral-700/50 bg-neutral-800/50 px-2 tracking-wider text-gray-400">
              C
            </kbd>{" "}
            to copy my email
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <p className="mb-2 text-sm tracking-wide text-gray-500">More</p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                className="flex items-center gap-2.5 rounded-lg border border-neutral-800/50 bg-neutral-900/30 px-4 py-3 text-sm tracking-wide text-gray-400 transition-all hover:border-neutral-700 hover:text-white"
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div>
          <p className="mb-2 text-sm tracking-wide text-gray-500">Social Links</p>
          <div className="flex flex-wrap gap-3 pt-2 sm:gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-lg border border-neutral-800/50 bg-neutral-900/30 px-4 py-3 text-sm tracking-wide text-gray-400 transition-all hover:border-neutral-700 hover:text-white"
              >
                {link.icon}
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
