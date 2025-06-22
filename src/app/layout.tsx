import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothCursorWrapper } from "@/components/ui/smooth-cursor-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adithya A | Portfolio",
  description: "Full Stack Web Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
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
            <div className="absolute inset-0 bg-gradient-to-tl from-emerald-900/3 via-transparent to-pink-900/3" />
          </div>

          <SmoothCursorWrapper />
          {children}
        </div>
      </body>
    </html>
  );
}
