import { NextRequest, NextResponse } from "next/server";
import { changePassword, validateSession } from "@/lib/db-auth";

// Change password (authenticated)
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_session")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = await validateSession(token);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await changePassword(session.adminId, currentPassword, newPassword);

    return NextResponse.json({ 
      success: true,
      message: "Password changed successfully" 
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to change password" },
      { status: 400 }
    );
  }
}
