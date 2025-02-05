// src/app/api/signup/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Signup request body:", body); // Logging for debugging
    const { name, email, password } = body;

    if (!email || !password) {
      console.log("Missing email or password");
      return NextResponse.json(
        { success: false, error: "Email and password required" },
        { status: 400 }
      );
    }

    // Check if a user with the given email already exists.
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      console.log("User already exists with email:", email);
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password before saving.
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log("New user created:", newUser);

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error("Error signing up:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
