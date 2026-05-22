import { ImageResponse } from "next/og";
import { OGTemplate, loadOGFonts } from "../_og/template";

export const runtime = "nodejs";
export const alt =
  "Blog — Adithya Anand's writing on backend engineering, zero-knowledge proofs, and Rust.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fonts = await loadOGFonts();

  return new ImageResponse(
    (
      <OGTemplate
        subtitle="Writing"
        bullets={[
          "Backend engineering · zero-knowledge proofs",
          "Rust · privacy-preserving systems",
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
