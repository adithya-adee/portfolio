import type { Metadata } from "next";
import { JetBrains_Mono, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/SEO";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import { ViewTransitions } from "next-view-transitions";
// SoftCursor temporarily unmounted — the dot felt like it was chasing the native
// cursor. Keep the component file for an easy revert if we want it back.
import {
  AuroraBackdrop,
  CommandPaletteHint,
  KonamiCode,
  ResumeLink,
  ScrollProgressRail,
  SmoothScroll,
  ThemeToggle,
} from "@/components/motion";
import { CommandPaletteMount } from "@/components/motion/CommandPaletteMount";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

const SITE_URL = "https://glitchymoon.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Adithya Anand | Backend & Blockchain Engineer",
    template: "%s | Adithya Anand",
  },
  description:
    "Adithya Anand — Backend & Blockchain Engineer specializing in zero-knowledge proofs, Rust (Axum), Solana, and distributed systems. Computer Science at NITK Surathkal, currently at Umbra Privacy. Portfolio of shipped open-source projects, work history, and writing.",
  applicationName: "Adithya Anand Portfolio",
  authors: [{ name: "Adithya Anand", url: "https://github.com/adithya-adee" }],
  creator: "Adithya Anand",
  publisher: "Adithya Anand",
  keywords: [
    // Identity
    "Adithya Anand",
    "glitchy_moon",
    "backend developer",
    "full stack developer",

    // Current focus
    "zero-knowledge proofs developer",
    "zk-SNARK engineer",
    "Circom developer",
    "snarkjs",
    "Groth16",
    "trusted setup ceremony",
    "Phase 2 ceremony",
    "privacy engineering",
    "Umbra Privacy",
    "private bridge",
    "cross-chain bridge",

    // Backend / languages
    "rust developer",
    "axum framework",
    "node.js developer",
    "nestjs",
    "express.js",
    "typescript",
    "javascript",

    // Web3
    "solana developer",
    "anchor framework",
    "blockchain developer",
    "smart contracts",

    // Infra
    "postgresql",
    "mongodb",
    "redis",
    "docker",
    "aws",
    "kafka",
    "ci/cd",

    // General
    "software engineer",
    "portfolio",
    "nitk surathkal",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Adithya Anand | Backend & Blockchain Engineer",
    description:
      "Adithya Anand — Backend & Blockchain Engineer specializing in zero-knowledge proofs, Rust (Axum), and Solana. Portfolio of shipped open-source projects, work history, and writing.",
    url: SITE_URL,
    siteName: "Adithya Anand Portfolio",
    locale: "en_US",
    type: "website",
    // The OG image comes from the `opengraph-image.tsx` file convention
    // (src/app/opengraph-image.tsx + per-route variants).
  },
  twitter: {
    card: "summary_large_image",
    title: "Adithya Anand | Backend & Blockchain Engineer",
    description:
      "Adithya Anand — Backend & Blockchain Engineer · Rust (Axum) · Zero-Knowledge Proofs · Solana · NITK Surathkal.",
    creator: "@glitchy_moon_",
    site: "@glitchy_moon_",
    // Twitter image inherits from openGraph (Next reuses the OG image route).
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head>
          <StructuredData />
        </head>
        <body
          className={`${jetbrainsMono.variable} ${inter.variable} ${instrumentSerif.variable}`}
        >
          <ThemeProvider>
            <AuroraBackdrop />
            <SmoothScroll />
            <ScrollProgressRail />
            <ResumeLink />
            <CommandPaletteHint />
            <ThemeToggle />
            <CommandPaletteMount />
            <KonamiCode />
            <Toaster position="top-right" richColors />
            <Analytics />
            <SpeedInsights />
            <main className="relative min-h-screen">{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
