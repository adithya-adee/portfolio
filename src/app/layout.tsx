import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/SEO";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <div className="relative min-h-screen">
          {/* Background Pattern */}
          <div className="fixed inset-0 -z-10">
            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
              }}
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-blue-900/5" />
            <div className="from-emerald-900/3 to-pink-900/3 absolute inset-0 bg-gradient-to-tl via-transparent" />
          </div>
          <Toaster position="top-right" theme="dark" richColors />
          <Analytics />
          {children}
        </div>
      </body>
    </html>
  );
}
