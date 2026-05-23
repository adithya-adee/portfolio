"use client";

import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { MagneticButton, Reveal, SectionTitle } from "@/components/motion";

const EMAIL = "adithya25905@gmail.com";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: <SiLinkedin aria-hidden="true" size={18} />,
    url: "https://linkedin.com/in/adithya-a-8bb28128a",
  },
  {
    name: "GitHub",
    icon: <SiGithub aria-hidden="true" size={18} />,
    url: "https://github.com/adithya-adee",
  },
  {
    name: "X (Twitter)",
    icon: <SiX aria-hidden="true" size={18} />,
    url: "https://x.com/glitchy_moon_",
  },
  // Email is intentionally not duplicated here — the big featured email card
  // above already handles that affordance + Y-yank shortcut.
  // Peerlist hidden for now — uncomment to re-enable.
  // {
  //   name: "Peerlist",
  //   icon: <SiPeerlist aria-hidden="true" size={18} />,
  //   url: "https://peerlist.io/glitchy_moon",
  // },
];

export default function Connect() {
  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(EMAIL);
    toast.success("Email yanked to clipboard!", {
      description: EMAIL,
      duration: 2000,
    });
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target instanceof HTMLElement && event.target.isContentEditable)
      ) {
        return;
      }
      if (event.key.toLowerCase() === "y") {
        copyEmail();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [copyEmail]);

  return (
    <section className="mx-auto max-w-3xl px-4 py-4 sm:px-6 sm:py-6">
      <SectionTitle index={5}>Connect with Me</SectionTitle>

      <div className="space-y-6">
        {/* Email hero element */}
        <Reveal y={14}>
          <div className="rounded-2xl border border-soft bg-surface-1 p-5 shadow-elev-1 sm:p-6">
            <p className="mb-2 text-label uppercase tracking-[0.15em] text-tertiary">Email</p>
            <MagneticButton strength={0.15}>
              <a
                href={`mailto:${EMAIL}`}
                className="block break-all font-mono text-h2 font-medium tracking-tight text-accent transition-opacity hover:opacity-90 sm:text-display-2"
              >
                {EMAIL}
              </a>
            </MagneticButton>
            {/* Mobile gets a tap-friendly copy button; desktop keeps the
                keyboard shortcut hint since there's a physical Y key there.
                `flex` (not inline-flex) so the button always lands on its
                own line below the email rather than flowing inline next to it. */}
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email to clipboard"
              title="Copy email"
              className="mt-5 flex h-9 w-9 items-center justify-center rounded-md border border-soft bg-surface-2 text-secondary transition-colors duration-base ease-out-soft hover:border-strong hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1 sm:hidden"
            >
              <Copy aria-hidden="true" size={16} />
            </button>
            <p className="mt-3 hidden text-label tracking-wide text-secondary sm:block">
              Press{" "}
              <kbd className="rounded-md border border-soft bg-surface-2 px-2 py-0.5 font-mono text-[12px] font-medium tracking-wider text-primary shadow-elev-1">
                Y
              </kbd>{" "}
              anywhere to yank to clipboard
            </p>
          </div>
        </Reveal>

        {/* Socials */}
        <Reveal y={12} delay={0.08}>
          <p className="mb-2 text-label uppercase tracking-[0.15em] text-tertiary">Social</p>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <MagneticButton key={link.name} strength={0.25}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex items-center gap-2.5 rounded-lg border border-soft bg-surface-1 px-4 py-3 text-label font-medium tracking-wide text-secondary transition-all duration-base ease-out-soft hover:-translate-y-0.5 hover:border-strong hover:bg-surface-2 hover:text-primary hover:shadow-elev-2"
                >
                  <span className="text-tertiary transition-colors group-hover/btn:text-accent">
                    {link.icon}
                  </span>
                  {link.name}
                </a>
              </MagneticButton>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
