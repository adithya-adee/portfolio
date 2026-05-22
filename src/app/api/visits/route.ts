import { NextResponse } from "next/server";
import { headers } from "next/headers";

const KV_REST_API_URL = process.env.KV_REST_API_URL;
const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN;

const VISITS_KEY = "portfolio:visits:total";

// Rate limit: max 5 POSTs per IP per 60 seconds.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SEC = 60;

interface VisitsResponse {
  totalVisits: number;
}

async function redisCommand(command: (string | number)[]): Promise<string | number | null> {
  if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
    throw new Error("Redis configuration missing");
  }
  const response = await fetch(
    `${KV_REST_API_URL}/${command.map((c) => encodeURIComponent(String(c))).join("/")}`,
    {
      headers: { Authorization: `Bearer ${KV_REST_API_TOKEN}` },
    }
  );
  if (!response.ok) {
    throw new Error(`Redis command failed: ${response.statusText}`);
  }
  const data = await response.json();
  return data.result;
}

/**
 * Fixed-window per-IP rate limiter on top of the existing Redis REST helper.
 * Window key is the integer division of the current minute. INCR + EXPIRE on
 * first-of-window keeps the surface small (one TTL'd counter per IP-minute).
 */
async function isRateLimited(ip: string): Promise<boolean> {
  const windowKey = Math.floor(Date.now() / (RATE_LIMIT_WINDOW_SEC * 1000));
  const key = `portfolio:visits:rl:${ip}:${windowKey}`;
  const count = (await redisCommand(["INCR", key])) as number;
  if (count === 1) {
    // First request of the window — set TTL so the key auto-evicts.
    await redisCommand(["EXPIRE", key, RATE_LIMIT_WINDOW_SEC]);
  }
  return count > RATE_LIMIT_MAX;
}

/**
 * Same-origin check. Allows Vercel deployments (production + previews) and
 * localhost. Anything else (a curl from outside, an embed on another origin)
 * is rejected.
 */
function isOriginAllowed(origin: string | null, referer: string | null): boolean {
  const sources = [origin, referer].filter(Boolean) as string[];
  if (sources.length === 0) return false;
  return sources.some((url) => {
    try {
      const u = new URL(url);
      return (
        u.host === "vercel.app" ||
        u.host.endsWith(".vercel.app") ||
        u.host === "localhost" ||
        u.host.startsWith("localhost:") ||
        u.host === "127.0.0.1" ||
        u.host.startsWith("127.0.0.1:")
      );
    } catch {
      return false;
    }
  });
}

function getClientIp(headersList: Headers): string {
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  const ip = forwardedFor?.split(",")[0]?.trim() || realIp || "anonymous";
  return ip;
}

async function getTotalVisits(): Promise<number> {
  const raw = await redisCommand(["GET", VISITS_KEY]);
  return raw ? parseInt(String(raw), 10) : 0;
}

export async function GET() {
  try {
    const totalVisits = await getTotalVisits();
    return NextResponse.json({ totalVisits } as VisitsResponse);
  } catch (error) {
    console.error("Error fetching visits:", error);
    return NextResponse.json({ totalVisits: 0 } as VisitsResponse, { status: 500 });
  }
}

export async function POST() {
  try {
    const headersList = await headers();

    // 1) Same-origin guard. Block external POSTs.
    const origin = headersList.get("origin");
    const referer = headersList.get("referer");
    if (!isOriginAllowed(origin, referer)) {
      return NextResponse.json(
        { totalVisits: await getTotalVisits() } as VisitsResponse,
        { status: 403 }
      );
    }

    // 2) Per-IP rate limit. If exceeded, return current count without bumping.
    const ip = getClientIp(headersList);
    if (await isRateLimited(ip)) {
      return NextResponse.json(
        { totalVisits: await getTotalVisits() } as VisitsResponse,
        { status: 429 }
      );
    }

    // 3) Atomic INCR.
    const totalVisitsRaw = await redisCommand(["INCR", VISITS_KEY]);
    const totalVisits = typeof totalVisitsRaw === "number" ? totalVisitsRaw : 0;
    return NextResponse.json({ totalVisits } as VisitsResponse);
  } catch (error) {
    console.error("Error recording visit:", error);
    return NextResponse.json({ totalVisits: 0 } as VisitsResponse, { status: 500 });
  }
}
