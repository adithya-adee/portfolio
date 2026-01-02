/**
 * SEO Component with JSON-LD Structured Data
 * Implements schema.org best practices for search engine optimization
 */
export default function StructuredData() {
  const baseUrl = "https://adithya-anand-portfolio.vercel.app";

  // Multiple structured data objects for comprehensive SEO
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: "Adithya Anand",
    alternateName: ["@glitchy_moon", "Adithya A"],
    url: baseUrl,
    image: {
      "@type": "ImageObject",
      url: `${baseUrl}/profile.jpg`,
      width: "400",
      height: "400",
    },
    email: "mailto:adithyaa.211cs103@nitk.edu.in",
    jobTitle: "Backend Developer",
    description:
      "3rd-year Computer Science student at NITK Surathkal and Backend Developer with professional experience building scalable backend systems, Web3 integrations on Solana, and zero-knowledge proof workflows.",

    // Professional profiles
    sameAs: [
      "https://github.com/adithya-adee",
      "https://www.linkedin.com/in/adithya-a-8bb28128a",
      "https://x.com/AdithyaA593326",
      "https://www.reddit.com/user/Glithcy_moon_69/",
    ],

    // Education
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "National Institute of Technology Karnataka",
      alternateName: "NITK Surathkal",
      url: "https://www.nitk.ac.in/",
    },

    // Current employer
    worksFor: {
      "@type": "Organization",
      name: "OkieDokie",
      alternateName: "ODPay",
      url: "https://okiedokiepay.com/",
      description: "Campus automation and payments platform",
    },

    // Professional memberships
    memberOf: [
      {
        "@type": "Organization",
        name: "IEEE Summer of Code",
        url: "https://www.ieeesoc.xyz/",
      },
      {
        "@type": "Organization",
        name: "YHILLS Ed.Tech",
        url: "https://yhills.com",
      },
    ],

    // Skills and expertise
    knowsAbout: [
      "Backend Development",
      "System Design",
      "Distributed Systems",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "NestJS",
      "Express.js",
      "Rust",
      "Axum",
      "React",
      "Next.js",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Web3 Development",
      "Solana Blockchain",
      "Anchor Framework",
      "Cryptography",
      "Zero-Knowledge Proofs",
      "Circom",
      "snarkjs",
      "Docker",
      "CI/CD",
      "Testing",
      "Observability",
    ],

    // Awards and achievements
    award: ["Top 10% contributor — IEEE Summer of Code (May–June 2025)"],

    // Work experience
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Backend Developer Intern",
        occupationLocation: {
          "@type": "Place",
          name: "OkieDokie (ODPay)",
        },
        skills: "REST API Development, Redis, CI/CD, Testing, Observability",
        description:
          "Engineered 50+ REST APIs, improved latency with Redis and aggregation pipelines, implemented CI/CD, testing, and observability for a campus automation and payments platform.",
        estimatedSalary: {
          "@type": "MonetaryAmountDistribution",
          name: "Internship",
          currency: "INR",
        },
      },
    ],
  };

  // Website/WebPage schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Adithya Anand - Backend Developer Portfolio",
    description:
      "Professional portfolio showcasing backend development projects, Web3 applications, and full-stack engineering work",
    publisher: {
      "@id": `${baseUrl}/#person`,
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  // Portfolio/CreativeWork schema for projects
  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Projects",
    description: "Portfolio of web development and blockchain projects",
    itemListElement: [
      {
        "@type": "CreativeWork",
        position: 1,
        name: "SolidKYC",
        url: "https://github.com/adithya-adee/SolidKYC",
        description:
          "Privacy-preserving on-chain KYC verification system using Solana blockchain and Zero-Knowledge Proofs (Circom/snarkjs)",
        author: { "@id": `${baseUrl}/#person` },
        keywords: ["Solana", "Web3", "Zero-Knowledge Proofs", "Blockchain", "Cryptography"],
        programmingLanguage: ["TypeScript", "Rust", "Circom"],
      },
      {
        "@type": "CreativeWork",
        position: 2,
        name: "AMM Uniswap V2 Implementation",
        url: "https://github.com/adithya-adee/amm_uniswap",
        description:
          "From-scratch implementation of Uniswap V2-style Automated Market Maker with constant-product formula, liquidity pools, and LP token mechanics",
        author: { "@id": `${baseUrl}/#person` },
        keywords: ["DeFi", "AMM", "Smart Contracts", "Blockchain"],
        programmingLanguage: ["Solidity", "JavaScript"],
      },
      {
        "@type": "CreativeWork",
        position: 3,
        name: "CodeSync",
        url: "https://github.com/devgambo/CodeSync",
        description:
          "Real-time collaborative coding environment with integrated whiteboard, AI chat powered by Gemini API, and optimized sync using Liveblocks",
        author: { "@id": `${baseUrl}/#person` },
        keywords: ["Real-time Collaboration", "WebSockets", "AI Integration", "React"],
        programmingLanguage: ["TypeScript", "React", "Node.js"],
      },
      {
        "@type": "CreativeWork",
        position: 4,
        name: "Hackverse",
        url: "https://github.com/adithya-adee/hackverse",
        description:
          "Scalable hackathon management platform with role-based access control, normalized PostgreSQL schema, and NestJS backend architecture",
        author: { "@id": `${baseUrl}/#person` },
        keywords: ["Full Stack", "NestJS", "PostgreSQL", "RBAC"],
        programmingLanguage: ["TypeScript", "PostgreSQL"],
      },
    ],
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
    ],
  };

  // Combine all schemas into a graph
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [personSchema, websiteSchema, portfolioSchema, breadcrumbSchema],
  };

  return (
    <>
      {/* Main structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Additional meta tags for better SEO */}
      <meta name="author" content="Adithya Anand" />
      <meta name="generator" content="Next.js" />
      <link rel="canonical" href={baseUrl} />
    </>
  );
}
