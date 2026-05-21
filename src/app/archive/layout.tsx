import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work Experience",
  description:
    "Full work experience of Adithya Anand — Backend Developer at Umbra Privacy (Private Bridge, ZKP Phase 2 ceremony), ODPay (OkieDokie) backend intern, IEEE Summer of Code, and Solana freelance.",
  alternates: { canonical: "/archive" },
  openGraph: {
    title: "Work Experience | Adithya Anand",
    description:
      "Full work history — Umbra Privacy (zk / privacy infra), ODPay backend internship, IEEE SoC, and Solana freelance.",
    url: "/archive",
    type: "profile",
  },
};

export default function ArchiveLayout({ children }: { children: React.ReactNode }) {
  return children;
}
