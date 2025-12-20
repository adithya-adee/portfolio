export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Adithya Anand",
    alternateName: "@glitchy_moon",
    url: "https://adithya-anand-portfolio.vercel.app/",
    image: "https://adithya-anand-portfolio.vercel.app/profile_picture.jpg",
    sameAs: [
      "https://github.com/adithya-adee",
      "https://linkedin.com/in/adithya-a-8bb28128a",
      "https://x.com/AdithyaA593326",
      "https://www.reddit.com/user/Glithcy_moon_69/",
    ],
    jobTitle: "Backend Developer",
    affiliation: {
      "@type": "EducationalOrganization",
      name: "NITK Surathkal",
    },
    description:
      "3rd year student at NITK Surathkal. Backend Developer with 1 year of professional experience. Building scalable systems with Rust, Solana, and Web3 technologies. Exploring cryptography and blockchain development.",
    knowsAbout: [
      "Backend Development",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "Rust",
      "Web3",
      "Solana",
      "Cryptography",
      "Blockchain",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
