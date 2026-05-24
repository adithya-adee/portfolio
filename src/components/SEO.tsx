/**
 * SEO Component with JSON-LD Structured Data
 * Implements schema.org best practices for search engine optimization.
 *
 * Canonical site URL is `https://glitchymoon.dev` — every URL emitted here
 * must use that host so JSON-LD, OG, and the Next metadata API agree.
 */
export default function StructuredData() {
  const baseUrl = "https://glitchymoon.dev";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: "Adithya Anand",
    givenName: "Adithya",
    familyName: "Anand",
    alternateName: ["@glitchy_moon", "glitchy_moon", "Adithya A"],
    url: baseUrl,
    image: {
      "@type": "ImageObject",
      url: `${baseUrl}/profile.png`,
      width: "400",
      height: "400",
    },
    email: "mailto:adithya25905@gmail.com",
    jobTitle: "Backend & Blockchain Engineer",
    description:
      "Adithya Anand — Backend & Blockchain Engineer specializing in zero-knowledge proofs, Rust (Axum), and Solana. Computer Science at NITK Surathkal, currently at Umbra Privacy. Production experience in distributed systems, cryptography, and full-stack engineering.",

    // Professional profiles
    sameAs: [
      "https://github.com/adithya-adee",
      "https://www.linkedin.com/in/adithya-a-8bb28128a",
      "https://x.com/glitchy_moon_",
      "https://peerlist.io/glitchy_moon",
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
      name: "Umbra Privacy",
      url: "https://umbraprivacy.com",
      description:
        "Privacy infrastructure company building zero-knowledge proof systems for web applications — Private Bridge and ZKP Phase 2 ceremony.",
    },

    // Past affiliations and communities
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
      "Tokio",
      "React",
      "Next.js",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Kafka",
      "Web3 Development",
      "Solana Blockchain",
      "Anchor Framework",
      "Cryptography",
      "Zero-Knowledge Proofs",
      "zk-SNARKs",
      "Groth16",
      "Circom",
      "snarkjs",
      "Arcium",
      "Multi-Party Computation",
      "Trusted Execution Environments",
      "Trusted Setup Ceremony",
      "Privacy Engineering",
      "Cross-Chain Bridges",
      "AWS",
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
        name: "Backend Developer",
        occupationLocation: {
          "@type": "Place",
          name: "Umbra Privacy",
        },
        skills:
          "Rust, Axum, Circom, snarkjs, Groth16, Zero-Knowledge Proofs, Solana, Anchor, AWS, PostgreSQL, TypeScript, Cryptography",
        description:
          "Designing and shipping privacy-preserving infrastructure — the Private Bridge for web applications and the ZKP Phase 2 trusted-setup ceremony. Writing production Rust services with Axum, authoring Circom circuits, and operating AWS infrastructure for prover and relayer services.",
      },
      {
        "@type": "Occupation",
        name: "Backend Developer Intern",
        occupationLocation: {
          "@type": "Place",
          name: "OkieDokie (ODPay)",
        },
        skills:
          "Node.js, Express.js, MongoDB, Redis, REST APIs, CI/CD, Testing (Jest, Supertest), Datadog APM, AWS SNS",
        description:
          "Engineered 50+ REST APIs, improved latency 50–80% with Redis and aggregation pipelines, and built CI/CD, testing, and observability for a campus automation and payments platform serving 10k+ users (Aug 2025 – Apr 2026).",
        estimatedSalary: {
          "@type": "MonetaryAmountDistribution",
          name: "Internship",
          currency: "INR",
        },
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Adithya Anand — Backend Developer Portfolio",
    description:
      "Portfolio of Adithya Anand — Backend & Blockchain Engineer specialising in Rust (Axum), Solana, and full-stack engineering.",
    publisher: { "@id": `${baseUrl}/#person` },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  // ProfilePage hint — improves Google's "About this result" surface for personal sites.
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${baseUrl}/#profilepage`,
    url: baseUrl,
    mainEntity: { "@id": `${baseUrl}/#person` },
    dateModified: new Date().toISOString().slice(0, 10),
  };

  // Featured work — mix of personal OSS projects and current employer products.
  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Work",
    description: "Selected projects, open-source contributions, and shipped products.",
    itemListElement: [
      {
        "@type": "CreativeWork",
        position: 1,
        name: "Umbra Privacy — Private Bridge for Web Apps",
        url: "https://umbraprivacy.com",
        description:
          "Privacy-preserving cross-chain bridge using zk-SNARKs to hide source, destination, and amount metadata. Backend engineer building the prover, relayer, and indexer infrastructure with Rust (Axum) and Circom.",
        author: { "@id": `${baseUrl}/#person` },
        keywords: [
          "Zero-Knowledge Proofs",
          "Cross-Chain Bridge",
          "Privacy",
          "Cryptography",
          "Rust",
        ],
        programmingLanguage: ["Rust", "Circom", "TypeScript"],
      },
      {
        "@type": "CreativeWork",
        position: 2,
        name: "ZKP Phase 2 Trusted-Setup Ceremony",
        url: "https://umbraprivacy.com",
        description:
          "Phase 2 trusted-setup ceremony for the Umbra privacy protocol — circuit-specific contribution flow, transcript verification, and Powers-of-Tau toxic-waste handling.",
        author: { "@id": `${baseUrl}/#person` },
        keywords: ["Trusted Setup", "Groth16", "Phase 2 Ceremony", "snarkjs", "Circom"],
        programmingLanguage: ["Rust", "Circom", "TypeScript"],
      },
      {
        "@type": "CreativeWork",
        position: 3,
        name: "ShadowLend",
        url: "https://github.com/adithya-adee/ShadowLend",
        description:
          "Privacy-preserving lending protocol on Solana — protects user deposit and borrow balances using client-side encryption, Ed25519 signatures, and Arcium Trusted Execution Environments (TEEs). Risk computation (Health Factor, interest) runs inside Arcium MXEs.",
        author: { "@id": `${baseUrl}/#person` },
        keywords: ["Privacy", "DeFi", "Solana", "Arcium TEE", "Anchor", "Cryptography"],
        programmingLanguage: ["Rust", "TypeScript"],
      },
      {
        "@type": "CreativeWork",
        position: 4,
        name: "SolidKYC",
        url: "https://github.com/adithya-adee/SolidKYC",
        description:
          "Privacy-preserving on-chain KYC verification system on Solana using zero-knowledge proofs (Circom / snarkjs). Users prove identity validity without revealing personal data; Anchor program verifies zk-SNARK proofs on-chain.",
        author: { "@id": `${baseUrl}/#person` },
        keywords: ["Zero-Knowledge Proofs", "Solana", "Anchor", "Circom", "snarkjs", "Privacy"],
        programmingLanguage: ["TypeScript", "Rust", "Circom"],
      },
      {
        "@type": "CreativeWork",
        position: 5,
        name: "crab-clean",
        url: "https://crates.io/crates/crab-clean",
        description:
          "Rust CLI for safe duplicate-file cleanup. Multi-threaded scanning via Rayon, 90% faster SHA-256 hashing through parallel disk I/O. Published on crates.io with 900+ downloads.",
        author: { "@id": `${baseUrl}/#person` },
        keywords: ["Rust", "CLI", "Open Source", "Performance", "Rayon"],
        programmingLanguage: ["Rust"],
      },
      {
        "@type": "CreativeWork",
        position: 6,
        name: "solana-indexer-sdk",
        url: "https://crates.io/crates/solana-indexer-sdk",
        description:
          "Lightweight, customizable Rust SDK for indexing Solana block, transaction, and account activity. Async (tokio) pipeline with reorg handling, RPC polling, WebSocket and Helius-Webhook sources, and IDL-based type-safe event decoding.",
        author: { "@id": `${baseUrl}/#person` },
        keywords: ["Rust", "Solana", "Indexer", "Tokio", "Open Source", "WebSockets"],
        programmingLanguage: ["Rust"],
      },
    ],
  };

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

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      personSchema,
      websiteSchema,
      profilePageSchema,
      portfolioSchema,
      breadcrumbSchema,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
