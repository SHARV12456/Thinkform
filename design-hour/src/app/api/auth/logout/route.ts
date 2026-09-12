import { NextRequest, NextResponse } from "next/server";
import { invalidateSession } from "@/lib/db-auth";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_session")?.value;

    if (token) {
      await invalidateSession(token);
    }

    const response = NextResponse.json({ success: true });
    response.cookies.delete("admin_session");
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Logout failed" },
      { status: 500 }
    );
  }
}
