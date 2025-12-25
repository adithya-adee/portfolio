import { NextResponse } from 'next/server';

// Redis configuration from environment variables
const KV_REST_API_URL = process.env.KV_REST_API_URL;
const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN;

interface VisitsResponse {
  totalVisits: number;
}

// Helper to execute Redis commands via REST API
async function redisCommand(command: string[]): Promise<string | number | null> {
  if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
    throw new Error('Redis configuration missing');
  }

  const response = await fetch(`${KV_REST_API_URL}/${command.join('/')}`, {
    headers: {
      Authorization: `Bearer ${KV_REST_API_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Redis command failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.result;
}

// GET: Retrieve current visit count
export async function GET() {
  try {
    const totalVisitsRaw = await redisCommand(['GET', 'portfolio:visits:total']);
    const totalVisits = totalVisitsRaw ? parseInt(String(totalVisitsRaw), 10) : 0;

    return NextResponse.json({
      totalVisits,
    } as VisitsResponse);
  } catch (error) {
    console.error('Error fetching visits:', error);
    return NextResponse.json(
      { totalVisits: 0 } as VisitsResponse,
      { status: 500 }
    );
  }
}

// POST: Increment visit count
export async function POST() {
  try {
    // INCR for atomic increment - prevents data override
    const totalVisitsRaw = await redisCommand(['INCR', 'portfolio:visits:total']);
    const totalVisits = typeof totalVisitsRaw === 'number' ? totalVisitsRaw : 0;

    return NextResponse.json({
      totalVisits,
    } as VisitsResponse);
  } catch (error) {
    console.error('Error recording visit:', error);
    return NextResponse.json(
      { totalVisits: 0 } as VisitsResponse,
      { status: 500 }
    );
  }
}


