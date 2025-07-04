import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();
const LIKES_KEY = "portfolio:likes";

export async function GET() {
  try {
    const likes = (await redis.get(LIKES_KEY)) || 0;
    return NextResponse.json({ likes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch likes, ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { action } = body;

    if (!action || (action !== "increment" && action !== "decrement")) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    let likes;
    if (action === "increment") {
      likes = await redis.incr(LIKES_KEY);
    } else {
      const currentLikes = Number((await redis.get(LIKES_KEY)) || 0);
      const newCount = Math.max(0, currentLikes - 1);
      await redis.set(LIKES_KEY, newCount);
      likes = newCount;
    }

    return NextResponse.json(
      { likes },
      {
        status: 200,
        headers: { "Cache-Control": "no-store, max-age=0" },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update likes, ${error}` },
      { status: 500 }
    );
  }
}
