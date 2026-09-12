import { NextRequest, NextResponse } from "next/server";
import { authenticateAdmin } from "@/lib/db-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email.toLowerCase().trim() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const ipAddress = request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") || 
      "unknown";

    const session = await authenticateAdmin(email, password, ipAddress);

    const response = NextResponse.json(
      { 
        success: true,
        message: "Login successful",
        adminId: session.adminId,
        role: session.role,
      },
      { status: 200 }
    );

    response.cookies.set({
      name: "admin_session",
      value: session.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    
    // Generic error message
    return NextResponse.json(
      { 
        error: message.includes("Invalid") || message.includes("temporarily") 
          ? message 
          : "Invalid email or password",
      },
      { status: 401 }
    );
  }
}
