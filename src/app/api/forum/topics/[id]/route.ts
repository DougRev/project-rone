import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params since they are now a promise
    const { id } = await context.params;

    if (!id) {
      console.error("🚨 Missing topic ID in API request");
      return NextResponse.json(
        { success: false, error: "Missing id" },
        { status: 400 }
      );
    }

    console.log(`🔍 Fetching topic with ID: ${id}`);

    const topic = await prisma.topic.findUnique({ where: { id } });

    if (!topic) {
      return NextResponse.json(
        { success: false, error: "Topic not found" },
        { status: 404 }
      );
    }

    console.log(`✅ Topic found:`, topic);

    return NextResponse.json({ success: true, topic });
  } catch (error) {
    console.error("❌ Error fetching topic:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch topic" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Expecting a JSON body with "id" and "title"
    const body = (await request.json()) as { id: string; title: string };
    const { id, title } = body;

    if (!id || !title) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    const updatedTopic = await prisma.topic.update({
      where: { id },
      data: { title },
    });
    return NextResponse.json({ success: true, topic: updatedTopic });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to update topic" },
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
        { status: 401 }
      );
    }
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing id" },
        { status: 400 }
      );
    }
    await prisma.topic.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to delete topic" },
      { status: 500 }
    );
  }
}
