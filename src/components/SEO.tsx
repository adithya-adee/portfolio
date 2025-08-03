export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Adithya Anand",
    url: "https://adithya-anand-portfolio.vercel.app/",
    image: "https://adithya-anand-portfolio.vercel.app/profile_picture.jpg",
    sameAs: [
      "https://github.com/adithya-adee",
      "https://linkedin.com/in/adithya-a-8bb28128a",
      "https://x.com/AdithyaA593326",
    ],
    jobTitle: "Full Stack Web Developer",
    // worksFor: {
    //   "@type": "Organization",
    //   name: "Your Current Company", // Update as needed
    // },
    description:
      "Full Stack Web Developer specializing in modern web technologies",
    knowsAbout: [
      "Web Development",
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Rust",
      "Web3",
      "Solana",
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
