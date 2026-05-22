import { ImageResponse } from "next/og";
import { OGTemplate, loadOGFonts } from "./_og/template";

export const runtime = "nodejs";
export const alt =
  "Adithya Anand — Backend & Blockchain Engineer at Umbra Privacy. Private Bridge for web apps · ZKP Phase 2 ceremony.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fonts = await loadOGFonts();

  return new ImageResponse(
    (
      <OGTemplate
        subtitle="Backend & Blockchain Engineer at Umbra Privacy"
        bullets={[
          "Private Bridge for web apps · ZKP Phase 2 ceremony",
          "Rust (Axum) · Circom · Solana · AWS",
        ]}
      />
    ),
    {
      ...size,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fonts: fonts as any,
    }
  );
}
