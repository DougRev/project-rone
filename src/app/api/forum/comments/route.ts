import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ success: false, error: "Missing postId" }, { status: 400 });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: { user: true },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ success: true, comments });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { content, postId } = body;

    if (!content || !postId) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const newComment = await prisma.comment.create({
      data: {
        content,
        userId: session.user.id,
        postId,
      },
    });

    return NextResponse.json({ success: true, comment: newComment });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create comment" }, { status: 500 });
  }
}
