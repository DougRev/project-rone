// src/app/api/youtube/channel-stats/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Mark request as used even if not otherwise needed
  void request;
  
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!CHANNEL_ID || !API_KEY) {
    return NextResponse.json(
      { success: false, error: "Missing YouTube environment variables" },
      { status: 500 }
    );
  }

  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    const data = await res.json();
    console.log("YouTube API response:", data); // Debug log

    const subscriberStr = data.items?.[0]?.statistics?.subscriberCount;
    const subscriberCount = subscriberStr ? parseInt(subscriberStr, 10) : 0;

    return NextResponse.json({ success: true, subscriberCount });
  } catch (error) {
    console.error("Error fetching YouTube stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch YouTube stats" },
      { status: 500 }
    );
  }
}
