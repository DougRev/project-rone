// src/app/api/forum/posts/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const topicId = searchParams.get("topicId");
    if (!topicId) {
      return NextResponse.json(
        { success: false, error: "Missing topicId" },
        { status: 400 }
      );
    }

    // Get pagination parameters (defaults: page=1, limit=10)
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const posts = await prisma.post.findMany({
      where: { topicId },
      include: { user: true, topic: true, votes: true },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip,
    });

    // Count total posts to help with pagination UI on the client
    const totalPosts = await prisma.post.count({
      where: { topicId },
    });

    return NextResponse.json({ success: true, posts, totalPosts });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, content, topicId } = body;

    if (!title || !content || !topicId) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        userId: session.user.id,
        topicId,
      },
    });

    return NextResponse.json({ success: true, post: newPost });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { success: false, error: "Missing topic id" },
      { status: 400 }
    );
  }
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    await prisma.topic.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to delete topic" },
      { status: 500 }
    );
  }
}
