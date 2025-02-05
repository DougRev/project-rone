// src/app/api/test-db/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    return NextResponse.json({ success: true, userCount });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { success: false, error: "Database connection error" },
      { status: 500 }
    );
  }
}
