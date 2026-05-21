import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/SEO";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const SITE_URL = "https://glitchymoon.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Adithya Anand | Backend Developer · Zero-Knowledge & Web3 Engineer",
    template: "%s | Adithya Anand",
  },
  description:
    "Backend Developer at Umbra Privacy building zero-knowledge proof systems — Private Bridge for web apps and the ZKP Phase 2 trusted-setup ceremony. Production Rust (Axum), Circom, Solana (Anchor), Node.js, NestJS, PostgreSQL, Redis, and AWS infrastructure. See projects, work history, and writing.",
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
    title: "Adithya Anand | Backend Developer · Zero-Knowledge & Web3 Engineer",
    description:
      "Backend Developer at Umbra Privacy. Building the Private Bridge for web apps and engineering the ZKP Phase 2 trusted-setup ceremony with Rust (Axum), Circom, Solana, and AWS.",
    url: SITE_URL,
    siteName: "Adithya Anand Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Adithya Anand — Backend Developer building zero-knowledge proof systems with Rust, Circom, and Solana",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adithya Anand | Backend & ZK Engineer",
    description:
      "Backend Developer at Umbra Privacy. Private Bridge for web apps · ZKP Phase 2 ceremony · Rust (Axum) · Circom · Solana · AWS.",
    creator: "@glitchy_moon_",
    site: "@glitchy_moon_",
    images: ["/profile.png"],
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={`${jetbrainsMono.variable} ${inter.variable}`}>
        <div className="relative min-h-screen">
          {/* Background Pattern */}
          <div className="fixed inset-0 -z-10 bg-zinc-800/20">
            {/* Film Grain Texture - CSS Based */}
            <div
              className="grain-overlay pointer-events-none absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                opacity: 0.06,
                mixBlendMode: "overlay",
              }}
            />

            {/* Subtle Grid Pattern */}
            <div
              className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                `,
                backgroundSize: "64px 64px",
              }}
            />

            {/* Ambient color blobs */}
            <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-purple-600/70 opacity-[0.07] blur-[120px]" />
            <div className="absolute -left-40 top-1/2 h-[400px] w-[400px] rounded-full bg-blue-600/70 opacity-[0.07] blur-[120px]" />

            {/* Gradient Overlays for Depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-transparent to-transparent" />
          </div>
          <Toaster position="top-right" theme="dark" richColors />
          <Analytics />
          <SpeedInsights />
          {children}
        </div>
      </body>
    </html>
  );
}
