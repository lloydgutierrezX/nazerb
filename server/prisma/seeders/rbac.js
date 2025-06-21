import { PrismaClient } from "#root/generated/prisma/client.js";
const prisma = new PrismaClient();

export async function modulePermissionRoleSeeder(modules) {
  try {
    const role = await prisma.role.upsert({
      where: { name: "admin" },
      update: {},
      create: {
        name: "admin",
        code: "admin",
        active: true,
        description: "Admin role",
      },
    });

    for (const module of modules) {
      const modulePermissions = await prisma.module.upsert({
        where: { name: module.moduleName },
        update: {},
        create: {
          name: module.moduleName,
          code: module.moduleName,
          link: module.link,
          description: `${module.moduleName} module`,
          active: true,
          permission: {
            create: [
              {
                action: "create",
                code: `create:${module.moduleName}`,
                active: true,
                description: `${module.moduleName}:create permission`,
              },
              {
                action: "update",
                code: `update:${module.moduleName}`,
                active: true,
                description: `${module.moduleName}:update permission`,
              },
              {
                action: "delete",
                code: `delete:${module.moduleName}`,
                active: true,
                description: `${module.moduleName}:delete permission`,
              },
              {
                action: "retrieve",
                code: `retrieve:${module.moduleName}`,
                active: true,
                description: `${module.moduleName}:retrieve permission`,
              },
            ],
          },
        },
        include: {
          permission: true,
        },
      });

      await prisma.rolePermission.createMany({
        data: modulePermissions.permission.map((permission) => ({
          permissionId: permission.id,
          roleId: role.id,
        })),
        skipDuplicates: true, // Optional: prevents duplicate role-permissions
      });
    }
  } catch (error) {
    console.error("❌ Error seeding RBAC data:", error);
  }
}
