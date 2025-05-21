import { PrismaClient } from "#root/generated/prisma/client.js";
import { consoleLog } from "../utils.js";

const prisma = new PrismaClient();

export const findUnique = async (module, whereClause) => {
  consoleLog(
    `Entering findUnique fn for ${module}`,
    "title",
    `with params module=${module} where=${whereClause}`
  );

  try {
    const unique = await prisma[module].findUnique({ where: whereClause });
    consoleLog(`findUnique result`, "content", `value: ${unique}`);
    return unique;
  } catch (error) {
    consoleLog("findUnique fn error", "error", error?.message ?? error);
  } finally {
    consoleLog("Leaving findUnique fn", "Title");
  }
};

export const findMany = async (module, config) => {
  consoleLog(
    `Entering findMany fn for ${module}`,
    "title",
    `with config ${JSON.stringify(config)}`
  );
  try {
    const result = await prisma[module].findMany({
      orderBy: { createdAt: "desc" },
    });
    consoleLog("findMany result", "content", result);
    return result;
  } catch (err) {
    consoleLog("findMany fn error", "error", error?.message ?? error);
  } finally {
    consoleLog("Leaving findMany fn", "Title");
  }
};

export const create = async (module, data) => {
  consoleLog(
    `Entering update fn for ${module}`,
    "title",
    `with data ${JSON.stringify(data)}`
  );
  try {
    const result = await prisma[module].create({
      data,
    });
    consoleLog(`${module} ${data.name} created successfully`, "result", result);
    return result;
  } catch (err) {
    consoleLog("create fn error", "error", error?.message ?? error);
  } finally {
    consoleLog("Leaving create fn", "Title");
  }
};

export const update = async (module, data, whereClause) => {
  consoleLog(
    `Entering update fn for ${module}`,
    "title",
    `with data ${JSON.stringify(data)}`
  );
  try {
    const result = await prisma[module].update({
      where: whereClause,
      data,
    });

    consoleLog(`${module} ${data.name} created successfully`, "result", result);
    return result;
  } catch (err) {
    consoleLog("update fn error", "error", error?.message ?? error);
  } finally {
    consoleLog("Leaving update fn", "Title");
  }
};
