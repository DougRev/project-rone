// src/app/api/forum/topics/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const topics = await prisma.topic.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, topics });
  } catch (error) {
    console.error("Error fetching topics:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch topics" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json({ success: false, error: "Title is required" }, { status: 400 });
    }

    const newTopic = await prisma.topic.create({
      data: { title },
    });

    return NextResponse.json({ success: true, topic: newTopic });
  } catch (error) {
    console.error("Error creating topic:", error);
    return NextResponse.json({ success: false, error: "Failed to create topic" }, { status: 500 });
  }
}
