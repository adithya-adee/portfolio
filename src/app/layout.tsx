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

export const metadata: Metadata = {
  title: "Adithya Anand | Backend Developer | Web3 & Full Stack Engineer",
  description:
    "Backend Developer specializing in Node.js, NestJS, Rust (Axum), and Web3 technologies. Building scalable systems with PostgreSQL, Redis, Solana blockchain, and zero-knowledge proofs. View my projects and experience.",
  keywords: [
    // Primary skills
    "backend developer",
    "full stack developer",
    "web3 developer",
    "rust developer",
    "node.js developer",

    // Technologies
    "typescript",
    "javascript",
    "nestjs",
    "express.js",
    "axum",
    "postgresql",
    "mongodb",
    "redis",
    "docker",

    // Web3 & Blockchain
    "solana developer",
    "blockchain developer",
    "zero knowledge proofs",
    "smart contracts",
    "anchor framework",

    // General
    "portfolio",
    "software engineer",
    "nitk surathkal",
  ],
  authors: [{ name: "Adithya Anand", url: "https://github.com/adithya-adee" }],
  creator: "Adithya Anand",
  publisher: "Adithya Anand",
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
  metadataBase: new URL("https://glitchymoon.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Adithya Anand | Backend Developer & Web3 Engineer",
    description:
      "Building scalable backend systems with Node.js, Rust, and Web3 technologies. Specialized in distributed systems, blockchain development, and zero-knowledge proofs.",
    url: "https://glitchymoon.vercel.app/",
    siteName: "Adithya Anand Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Adithya Anand - Backend Developer specializing in Node.js, Rust, and Web3",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adithya Anand | Backend & Web3 Developer",
    description:
      "Backend Developer building with Node.js, Rust (Axum), Solana blockchain, and zero-knowledge proofs. Check out my projects!",
    creator: "@AdithyaA593326",
    images: ["/profile.jpg"],
  },
  verification: {
    // Add your verification tokens here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
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
          <div className="fixed inset-0 -z-10 bg-zinc-900/30">
            {/* Film Grain Texture - CSS Based */}
            <div
              className="grain-overlay pointer-events-none absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                opacity: 0.04,
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

            {/* Gradient Overlays for Depth */}
            <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-zinc-950/40 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[500px] bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent" />
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
