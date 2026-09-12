import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create roles
  const adminRole = await prisma.role.upsert({
    where: { name: "Admin" },
    update: {},
    create: {
      name: "Admin",
      description: "Full access to all admin features",
    },
  });

  const managerRole = await prisma.role.upsert({
    where: { name: "Manager" },
    update: {},
    create: {
      name: "Manager",
      description: "Manage bookings, customers, and generate reports",
    },
  });

  const viewerRole = await prisma.role.upsert({
    where: { name: "Viewer" },
    update: {},
    create: {
      name: "Viewer",
      description: "View-only access to dashboard and reports",
    },
  });

  // Create permissions
  const permissions = [
    {
      name: "view_dashboard",
      description: "View admin dashboard",
    },
    {
      name: "manage_admins",
      description: "Create, update, and delete admin accounts",
    },
    {
      name: "manage_bookings",
      description: "View and manage all bookings",
    },
    {
      name: "manage_customers",
      description: "View and manage customer information",
    },
    {
      name: "manage_services",
      description: "Update services and pricing",
    },
    {
      name: "view_analytics",
      description: "View analytics and reports",
    },
  ];

  const createdPermissions = await Promise.all(
    permissions.map((perm) =>
      prisma.permission.upsert({
        where: { name: perm.name },
        update: {},
        create: perm,
      })
    )
  );

  // Link roles to permissions
  // Admin: all permissions
  await prisma.role.update({
    where: { id: adminRole.id },
    data: {
      permissions: {
        connect: createdPermissions.map((p) => ({ id: p.id })),
      },
    },
  });

  // Manager: everything except manage_admins
  await prisma.role.update({
    where: { id: managerRole.id },
    data: {
      permissions: {
        connect: createdPermissions
          .filter((p) => p.name !== "manage_admins")
          .map((p) => ({ id: p.id })),
      },
    },
  });

  // Viewer: only view_dashboard and view_analytics
  await prisma.role.update({
    where: { id: viewerRole.id },
    data: {
      permissions: {
        connect: [
          createdPermissions.find((p) => p.name === "view_dashboard")!.id,
          createdPermissions.find((p) => p.name === "view_analytics")!.id,
        ].map((id) => ({ id })),
      },
    },
  });

  // Create initial admin
  const hashedPassword = await bcrypt.hash("ServerAdmin!2026", 10);

  const admin = await prisma.admin.upsert({
    where: { email: "admin@designhour.in" },
    update: {},
    create: {
      email: "admin@designhour.in",
      password: hashedPassword,
      firstName: "System",
      lastName: "Admin",
      roleId: adminRole.id,
      isActive: true,
    },
  });

  console.log("✅ Database seeded successfully!");
  console.log(`\n📋 Created Roles: Admin, Manager, Viewer`);
  console.log(`🔑 Created Admin: admin@designhour.in`);
  console.log(`📝 Temp Password: ServerAdmin!2026 (CHANGE IT AFTER FIRST LOGIN)\n`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
