import { PrismaClient } from "#root/generated/prisma/client.js";
import { modulePermissionRoleSeeder } from "./rbac.js";

const prisma = new PrismaClient();

async function main() {
  await modulePermissionRoleSeeder([
    {
      moduleName: "module",
      link: "security/modules",
    },
    {
      moduleName: "permissions",
      link: "security/permissions",
    },
    {
      moduleName: "roles",
      link: "security/roles",
    },
  ]);
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
