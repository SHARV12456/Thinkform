import { NextRequest, NextResponse } from "next/server";
import { 
  listAdmins, 
  createAdmin, 
  updateAdmin,
  deleteAdmin,
  validateSession 
} from "@/lib/db-auth";

// Helper to get session from request
async function getSession(request: NextRequest) {
  const token = request.cookies.get("admin_session")?.value;
  if (!token) return null;
  return validateSession(token);
}

// GET: List all admins
export async function GET(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!session.permissions.includes("manage_admins")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const admins = await listAdmins();
    return NextResponse.json(admins);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to list admins" },
      { status: 500 }
    );
  }
}

// POST: Create new admin
export async function POST(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!session.permissions.includes("manage_admins")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { email, password, firstName, lastName, role } = body;

    if (!email || !password || !firstName || !lastName || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const admin = await createAdmin(email, password, firstName, lastName, role);
    return NextResponse.json(admin, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create admin" },
      { status: 400 }
    );
  }
}

// PUT: Update admin
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!session.permissions.includes("manage_admins")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { adminId, firstName, lastName, role, isActive } = body;

    if (!adminId) {
      return NextResponse.json(
        { error: "Admin ID is required" },
        { status: 400 }
      );
    }

    const admin = await updateAdmin(adminId, {
      firstName,
      lastName,
      roleName: role,
      isActive,
    });

    return NextResponse.json(admin);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update admin" },
      { status: 400 }
    );
  }
}

// DELETE: Delete admin
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!session.permissions.includes("manage_admins")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const adminId = searchParams.get("id");

    if (!adminId) {
      return NextResponse.json(
        { error: "Admin ID is required" },
        { status: 400 }
      );
    }

    if (adminId === session.adminId) {
      return NextResponse.json(
        { error: "Cannot delete your own account" },
        { status: 400 }
      );
    }

    await deleteAdmin(adminId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete admin" },
      { status: 400 }
    );
  }
}
