// src/app/api/forum/topics/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    // Await params before using its properties
    const { id } = await params;
    try {
      const topic = await prisma.topic.findUnique({
        where: { id },
      });
  
      if (topic) {
        return NextResponse.json({ success: true, topic });
      } else {
        return NextResponse.json(
          { success: false, error: "Topic not found" },
          { status: 404 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Failed to fetch topic" },
        { status: 500 }
      );
    }
  }

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    
    const { title } = await request.json();
    if (!title) {
      return NextResponse.json({ success: false, error: "Title is required" }, { status: 400 });
    }
    
    const updatedTopic = await prisma.topic.update({
      where: { id: params.id },
      data: { title },
    });
    
    return NextResponse.json({ success: true, topic: updatedTopic });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update topic" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    
    await prisma.topic.delete({
      where: { id: params.id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete topic" }, { status: 500 });
  }
}
