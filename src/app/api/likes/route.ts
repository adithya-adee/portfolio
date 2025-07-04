import { kv } from "@vercel/kv";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const likes = (await kv.get("portfolio_likes")) || 0;
    return Response.json({ likes });
  } catch (error) {
    return Response.json({ error: "Failed to fetch likes" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();

    if (action === "increment") {
      const likes = await kv.incr("portfolio_likes");
      return Response.json({ likes });
    } else if (action === "decrement") {
      const currentLikes = (await kv.get("portfolio_likes")) || 0;
      const likes = await kv.set(
        "portfolio_likes",
        Math.max(0, Number(currentLikes) - 1)
      );
      return Response.json({ likes: likes });
    } else {
      return Response.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    return Response.json({ error: "Failed to update likes" }, { status: 500 });
  }
}
