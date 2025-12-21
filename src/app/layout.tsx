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
  title: "Adithya Anand | Full Stack Web Developer Portfolio",
  description:
    "Experienced Full Stack Web Developer specializing in React, Node.js, and modern web technologies. View my projects, skills and experience.",
  keywords:
    "full stack developer, web developer, react developer, node.js developer, javascript developer, portfolio",
  authors: [{ name: "Adithya Anand" }],
  creator: "Adithya Anand",
  publisher: "Adithya Anand",
  robots: "index, follow",
  metadataBase: new URL("https://adithya-anand-portfolio.vercel.app/"),
  alternates: {
    canonical: "https://adithya-anand-portfolio.vercel.app/",
  },
  openGraph: {
    title: "Adithya Anand | Full Stack Web Developer",
    description: "Portfolio showcasing my web development projects, skills, and experience",
    url: "https://adithya-anand-portfolio.vercel.app/",
    siteName: "Adithya Anand Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://adithya-anand-portfolio/profile_picture.jpg",
        width: 1200,
        height: 630,
        alt: "Adithya Anand - Full Stack Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adithya Anand | Web Developer Portfolio",
    description: "Check out my projects and skills in web development",
    images: ["https://adithya-anand-portfolio.vercel.app/twitter-image.jpg"],
  },
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
