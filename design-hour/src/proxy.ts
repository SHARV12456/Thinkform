import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if admin panel is enabled globally
  if (path.startsWith("/admin")) {
    const adminEnabled = process.env.ADMIN_PANEL_ENABLED === 'true';
    if (!adminEnabled) {
      request.nextUrl.pathname = '/404';
      return NextResponse.rewrite(request.nextUrl);
    }
  }

  // Allow public auth pages without session
  if (
    path === "/admin/login" ||
    path === "/admin/forgot-password" ||
    path === "/admin/reset-password"
  ) {
    return NextResponse.next();
  }

  // Protect admin routes
  if (path.startsWith("/admin")) {
    const token = request.cookies.get("admin_session")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Validate session in database (this would require passing the token to a validation function)
    // For now, if token exists, allow (validation happens during API calls)
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
