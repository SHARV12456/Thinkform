import { NextRequest, NextResponse } from "next/server";
import { initiatePasswordReset } from "@/lib/db-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = typeof body.email === "string" 
      ? body.email.toLowerCase().trim() 
      : "";

    // Always return generic message (don't leak whether email exists)
    const genericResponse = {
      success: true,
      message: "If that email is registered, a password reset link has been sent.",
    };

    if (!email || !email.includes("@")) {
      return NextResponse.json(genericResponse);
    }

    const resetToken = await initiatePasswordReset(email);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const resetLink = `${appUrl}/admin/reset-password?token=${encodeURIComponent(resetToken)}`;

    // TODO: Send email with reset link
    // For now, log to console for development
    console.log("🔐 Password Reset Link:", resetLink);

    return NextResponse.json(genericResponse);
  } catch (error) {
    // Return generic response even on error
    return NextResponse.json({
      success: true,
      message: "If that email is registered, a password reset link has been sent.",
    });
  }
}
