/* eslint-disable @next/next/no-img-element */

/**
 * Shared OG image template — rendered by `next/og` (Satori under the hood) into
 * a 1200×630 PNG. Satori only supports a constrained CSS subset: flexbox layout,
 * no CSS variables, no grid, limited filters. Everything here is inline styles.
 *
 * Used by:
 *   src/app/opengraph-image.tsx           (home — leads with current role)
 *   src/app/blog/opengraph-image.tsx      (writing subtitle)
 *   src/app/archive/opengraph-image.tsx   (work-history subtitle)
 */

interface OGTemplateProps {
  subtitle: string;
  bullets?: string[];
}

const C = {
  bg: "#16110f", // surface-0 (warm charcoal)
  text: "#f5f0e6", // text-primary (cream)
  textDim: "#a8a29e", // text-tertiary
  textDeep: "#d3c8b3", // body
  accent: "#f43f5e", // rose-500 flame red
  rule: "#3f3a37", // hairline border
};

export function OGTemplate({ subtitle, bullets }: OGTemplateProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: C.bg,
        color: C.text,
        fontFamily: "Inter",
        padding: "72px 96px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Warm spotlight blob — top-right corner */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -150,
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle at center, rgba(180, 83, 9, 0.35) 0%, rgba(244, 63, 94, 0.22) 30%, rgba(0,0,0,0) 70%)",
          borderRadius: "9999px",
          display: "flex",
        }}
      />

      {/* Bottom-left subtle accent glow for balance */}
      <div
        style={{
          position: "absolute",
          bottom: -160,
          left: -120,
          width: 480,
          height: 480,
          background:
            "radial-gradient(circle at center, rgba(244, 63, 94, 0.14) 0%, rgba(0,0,0,0) 70%)",
          borderRadius: "9999px",
          display: "flex",
        }}
      />

      {/* Top row — kicker */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontFamily: "JetBrainsMono",
          fontSize: 18,
          letterSpacing: 4,
          color: C.textDim,
          textTransform: "uppercase",
          zIndex: 1,
        }}
      >
        <span
          style={{
            display: "flex",
            width: 18,
            height: 5,
            backgroundColor: C.accent,
          }}
        />
        <span>Portfolio · 2026</span>
      </div>

      {/* Flexible spacer to push the title block toward vertical center */}
      <div style={{ display: "flex", flex: 1 }} />

      {/* Name */}
      <div
        style={{
          fontFamily: "InstrumentSerif",
          fontSize: 132,
          lineHeight: 1,
          letterSpacing: -3,
          color: C.text,
          display: "flex",
          zIndex: 1,
        }}
      >
        Adithya Anand
      </div>

      {/* Accent underline below the name */}
      <div
        style={{
          width: 200,
          height: 3,
          backgroundColor: C.accent,
          marginTop: 18,
          display: "flex",
          zIndex: 1,
        }}
      />

      {/* Subtitle */}
      <div
        style={{
          marginTop: 36,
          fontSize: 32,
          fontWeight: 500,
          color: C.text,
          letterSpacing: -0.2,
          display: "flex",
          zIndex: 1,
        }}
      >
        {subtitle}
      </div>

      {/* Optional bullets */}
      {bullets && bullets.length > 0 ? (
        <div
          style={{
            marginTop: 22,
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
          }}
        >
          {bullets.map((bullet, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontSize: 22,
                color: C.textDeep,
                marginBottom: i === bullets.length - 1 ? 0 : 10,
              }}
            >
              <span
                style={{
                  display: "flex",
                  width: 10,
                  height: 10,
                  backgroundColor: C.accent,
                }}
              />
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      ) : null}

      {/* Flexible spacer to push the footer to the bottom */}
      <div style={{ display: "flex", flex: 1 }} />

      {/* Footer rule + meta */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: "100%",
            height: 1,
            backgroundColor: C.rule,
            display: "flex",
          }}
        />
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "JetBrainsMono",
            fontSize: 18,
            color: C.textDim,
          }}
        >
          <span style={{ letterSpacing: 3, display: "flex" }}>GLITCHYMOON.VERCEL.APP</span>
          <span style={{ display: "flex", color: C.text }}>@glitchy_moon_</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Loads a Google Font as an ArrayBuffer for use with `ImageResponse`. Asks
 * Google Fonts CSS2 for the font face, extracts the .ttf URL (avoiding woff2
 * since Satori's Linux WASM build is more reliable with TTF), and fetches it.
 *
 * The Bot user-agent forces Google Fonts to serve TTF instead of WOFF2.
 */
export async function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer> {
  // Google Fonts expects literal `+` between family-name words — don't
  // URL-encode it. The caller passes the family already in Google's format
  // (e.g. "Instrument Serif" → we convert spaces to `+`).
  const familyParam = family.replace(/\s+/g, "+");
  const url = `https://fonts.googleapis.com/css2?family=${familyParam}:wght@${weight}&display=swap`;
  // Non-browser User-Agent gets us TTF URLs back (instead of WOFF2).
  const cssResponse = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/W.X.Y.Z Safari/537.36",
    },
  });
  if (!cssResponse.ok) {
    throw new Error(`Failed to load font CSS for ${family} ${weight}: ${cssResponse.status}`);
  }
  const css = await cssResponse.text();
  const match = css.match(/src:\s*url\(([^)]+)\)\s*format\(['"]?(truetype|opentype)['"]?\)/);
  if (!match) {
    throw new Error(`Could not extract TTF URL for ${family} ${weight} from CSS`);
  }
  const fontUrl = match[1].replace(/['"]/g, "");
  const fontResponse = await fetch(fontUrl);
  if (!fontResponse.ok) {
    throw new Error(`Failed to fetch font file for ${family} ${weight}: ${fontResponse.status}`);
  }
  return await fontResponse.arrayBuffer();
}

/**
 * Fetches the three fonts the OG template needs. Called once per route's OG
 * generation; results aren't cached across builds but the Next build runs each
 * opengraph-image at most once.
 */
export async function loadOGFonts() {
  const [instrumentSerif, inter, jetbrainsMono] = await Promise.all([
    loadGoogleFont("Instrument Serif", 400),
    loadGoogleFont("Inter", 500),
    loadGoogleFont("JetBrains Mono", 500),
  ]);
  return [
    { name: "InstrumentSerif", data: instrumentSerif, weight: 400, style: "normal" } as const,
    { name: "Inter", data: inter, weight: 500, style: "normal" } as const,
    { name: "JetBrainsMono", data: jetbrainsMono, weight: 500, style: "normal" } as const,
  ];
}
