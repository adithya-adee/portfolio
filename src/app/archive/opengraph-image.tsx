import { ImageResponse } from "next/og";
import { OGTemplate, loadOGFonts } from "../_og/template";

export const runtime = "nodejs";
export const alt =
  "Work history — Adithya Anand. Umbra Privacy · ODPay · IEEE Summer of Code · freelance.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fonts = await loadOGFonts();

  return new ImageResponse(
    (
      <OGTemplate
        subtitle="Work history"
        bullets={[
          "Umbra Privacy · ODPay (OkieDokie)",
          "IEEE Summer of Code · Solana freelance",
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
