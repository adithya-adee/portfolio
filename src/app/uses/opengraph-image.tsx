import { ImageResponse } from "next/og";
import { OGTemplate, loadOGFonts } from "../_og/template";

export const runtime = "nodejs";
export const alt =
  "Uses — Adithya Anand's daily-driver stack: editor, terminal, hardware, languages, music, reading.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fonts = await loadOGFonts();

  return new ImageResponse(
    (
      <OGTemplate
        subtitle="Uses"
        bullets={[
          "Editor · terminal · hardware",
          "Languages · cloud · music · reading",
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
