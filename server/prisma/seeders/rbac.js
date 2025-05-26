import { PrismaClient } from "#root/generated/prisma/client.js";
const prisma = new PrismaClient();

export async function modulePermissionRoleSeeder(modules) {
  const role = await prisma.role.upsert({
    where: { name: "admin" },
    update: {},
    create: {
      name: "admin",
      active: true,
      description: "Admin role",
    },
  });

  modules.forEach(async (module) => {
    const modulePermissions = await prisma.module.upsert({
      where: { name: module.moduleName },
      update: {},
      create: {
        name: module.moduleName,
        link: module.link,
        description: `${module.moduleName} module`,
        active: true,
        permission: {
          create: [
            {
              action: "create",
              active: true,
              description: `${module.moduleName}:create permission`,
            },
            {
              action: "update",
              active: true,
              description: `${module.moduleName}:update permission`,
            },
            {
              action: "delete",
              active: true,
              description: `${module.moduleName}:delete permission`,
            },
            {
              action: "retrieve",
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
    });
  });
}
