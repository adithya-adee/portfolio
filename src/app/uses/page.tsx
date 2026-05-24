import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { ArrowLeft } from "lucide-react";

const SITE_URL = "https://glitchymoon.vercel.app";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "The daily-driver stack — editor, terminal, hardware, languages, music, reading. Updated when things actually change.",
  alternates: { canonical: "/uses" },
  openGraph: {
    title: "Uses · Adithya Anand",
    description: "The daily-driver stack — editor, terminal, hardware, languages, music, reading.",
    url: `${SITE_URL}/uses`,
    type: "article",
  },
};

interface Item {
  name: string;
  note?: string;
  url?: string;
}

interface Section {
  title: string;
  intro?: string;
  items: Item[];
}

// Edit this when your stack actually changes — not on a schedule, not for the
// sake of churn. The point is honesty, not novelty.
const SECTIONS: Section[] = [
  {
    title: "Editor & terminal",
    items: [
      { name: "Visual Studio Code", note: "primary editor; Vim keybindings via VSCodeVim" },
      { name: "Cursor", note: "for AI pair-programming on green-field work" },
      { name: "iTerm2 + zsh + oh-my-zsh", note: "with Starship prompt" },
      { name: "tmux", note: "split-pane multiplexing" },
      { name: "JetBrains Mono", note: "ligatures on; editor + terminal + this site" },
    ],
  },
  {
    title: "Languages & frameworks",
    items: [
      { name: "Rust", note: "Axum for HTTP, Tokio for async, Rayon for parallel" },
      { name: "TypeScript", note: "Node, Next.js, the occasional CLI" },
      { name: "Solana + Anchor", note: "smart contracts and on-chain primitives" },
      { name: "Circom + snarkjs", note: "Groth16 circuits for ZK work" },
      { name: "PostgreSQL", note: "primary database; Prisma when the team uses it" },
    ],
  },
  {
    title: "Daily software",
    items: [
      { name: "Arc", note: "primary browser" },
      { name: "1Password", note: "secrets & SSH key management" },
      { name: "Linear", note: "issue tracking at Umbra Privacy" },
      { name: "Obsidian", note: "personal notes and second brain" },
      { name: "Raycast", note: "spotlight replacement + clipboard history" },
      { name: "Spotify", note: "playlists at the end of this page" },
    ],
  },
  {
    title: "Cloud & infra",
    items: [
      { name: "AWS", note: "IAM/KMS-scoped roles, Lambda, S3, attested compute" },
      { name: "Vercel", note: "this portfolio + most frontend deploys" },
      { name: "Cloudflare", note: "DNS, Workers, Pages" },
      { name: "Upstash", note: "Redis REST endpoint (this site's visit counter)" },
      { name: "Helius", note: "Solana RPC + webhooks for the indexer SDK" },
    ],
  },
  {
    title: "Hardware",
    items: [
      { name: "MacBook Pro (M-series)", note: "the everyday workhorse" },
      { name: "External 27\" display", note: "vertical for code, horizontal for docs" },
      { name: "Logitech MX Master 3S", note: "side-button macros wired to tmux" },
      { name: "Mechanical keyboard", note: "tactile switches, ortho-ish layout" },
      { name: "Over-ear ANC headphones", note: "for deep work" },
    ],
  },
  {
    title: "Music while coding",
    items: [
      { name: "Lo-fi hip-hop / ambient", note: "deep work" },
      { name: "Synthwave & chiptune", note: "shipping mode" },
      { name: "Long instrumental sets", note: "when the focus is one big problem" },
    ],
  },
  {
    title: "Reading recently",
    items: [
      { name: "Designing Data-Intensive Applications", note: "Martin Kleppmann" },
      { name: "ZK Proofs Foundations & Applications", note: "various papers" },
      { name: "Rust for Rustaceans", note: "Jon Gjengset" },
    ],
  },
];

export default function UsesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-20 sm:px-6 sm:pt-28">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono text-label uppercase tracking-[0.18em] text-tertiary transition-colors duration-base ease-out-soft hover:text-primary"
      >
        <ArrowLeft aria-hidden="true" size={14} />
        Back to home
      </Link>

      {/* Header */}
      <header className="mt-10 space-y-4">
        <p className="font-mono text-label uppercase tracking-[0.25em] text-tertiary">
          Bonus reel
        </p>
        <h1 className="font-serif text-display-2 font-normal italic leading-[1.05] tracking-tight text-primary">
          What I use
        </h1>
        <p className="max-w-2xl text-body-1 leading-relaxed text-primary/80">
          The daily-driver stack — editor, terminal, hardware, languages, music, reading. Updated
          when things actually change.
        </p>
      </header>

      <div className="my-10 h-px bg-accent/30" />

      {/* Sections */}
      <div className="space-y-12">
        {SECTIONS.map((section, index) => (
          <section key={section.title} className="space-y-4">
            <h2 className="flex items-baseline gap-3">
              <span className="font-mono text-label font-semibold uppercase tracking-[0.2em] text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true" className="font-mono text-label text-tertiary">
                —
              </span>
              <span className="font-serif text-h2 font-normal italic text-primary">
                {section.title}
              </span>
            </h2>
            {section.intro ? (
              <p className="text-body-2 leading-relaxed text-primary/75">{section.intro}</p>
            ) : null}
            <ul className="space-y-3">
              {section.items.map((item) => (
                <li key={item.name} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 shrink-0 text-accent/60">
                    ▸
                  </span>
                  <span className="text-body-2 leading-relaxed text-primary/85">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <span className="text-primary">{item.name}</span>
                    )}
                    {item.note ? (
                      <span className="text-primary/60"> — {item.note}</span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* Footer easter-egg hint */}
      <div className="mt-20 border-t border-soft pt-8">
        <p className="font-mono text-label uppercase tracking-[0.18em] text-tertiary/70">
          You found this via ↑ ↑ ↓ ↓ ← → ← → B A. Nice.
        </p>
      </div>
    </main>
  );
}
