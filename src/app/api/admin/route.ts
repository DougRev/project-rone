import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  // Mark `request` as used even if we don't need it now.
  void request;

  try {
    const session = await getServerSession(authOptions);
    // Mark `session` as used if you're not utilizing it yet.
    void session;
    // Your logic here...
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    const { postId, commentId } = await request.json();

    if (postId) {
      await prisma.post.delete({ where: { id: postId } });
      return NextResponse.json({ success: true, message: "Post deleted" });
    }

    if (commentId) {
      await prisma.comment.delete({ where: { id: commentId } });
      return NextResponse.json({ success: true, message: "Comment deleted" });
    }

    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Deletion failed" },
      { status: 500 }
    );
  }
}
