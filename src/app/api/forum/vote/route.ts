// src/app/api/forum/vote/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { postId, value } = await request.json();
    if (value !== 1 && value !== -1) {
      return NextResponse.json({ success: false, error: "Invalid vote value" }, { status: 400 });
    }

    // Check if the vote exists (using a composite key named userId_postId)
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_postId: { userId: session.user.id, postId },
      },
    });

    if (existingVote) {
      if (existingVote.value === value) {
        return NextResponse.json({ success: false, error: "You have already voted this way." }, { status: 400 });
      } else {
        const updatedVote = await prisma.vote.update({
          where: {
            userId_postId: { userId: session.user.id, postId },
          },
          data: { value },
        });
        return NextResponse.json({ success: true, vote: updatedVote });
      }
    } else {
      const newVote = await prisma.vote.create({
        data: {
          value,
          userId: session.user.id,
          postId,
        },
      });
      return NextResponse.json({ success: true, vote: newVote });
    }
  } catch (error) {
    console.error("Error processing vote:", error);
    return NextResponse.json({ success: false, error: "Failed to process vote" }, { status: 500 });
  }
}
