import { PrismaClient } from "#root/generated/prisma/client.js";
import { consoleLog } from "../utils.js";

const prisma = new PrismaClient();

export const validateDuplicate = async (module, compareColumn) => {
  // We check if passed name is taken by other reocrd already.
  const duplicateByName = await findFirst(module, compareColumn);
  // if duplicateByName has record, meaning the requested name to change is already taken. We return an error.
  return duplicateByName;
};

export const findFirst = async (module, whereClause) => {
  consoleLog(`Entering findFirst fn for ${module}`, "title", whereClause);

  try {
    const unique = await prisma[module].findFirst({ where: whereClause });
    consoleLog(`findFirst result`, "content", unique);
    return unique;
  } catch (error) {
    consoleLog("findFirst fn error", "error", error?.message ?? error);
  } finally {
    consoleLog("Leaving findFirst fn", "Title");
  }
};

export const findUnique = async (module, whereClause) => {
  consoleLog(`Entering findUnique fn for ${module}`, "title", whereClause);

  try {
    const unique = await prisma[module].findUnique({ where: whereClause });
    consoleLog(`findUnique result`, "content", unique);
    return unique;
  } catch (error) {
    consoleLog("findUnique fn error", "error", error?.message ?? error);
  } finally {
    consoleLog("Leaving findUnique fn", "Title");
  }
};

export const findMany = async (module, config) => {
  consoleLog(`Entering findMany fn for ${module}`, "title", config);
  try {
    const result = await prisma[module].findMany(config);
    consoleLog("findMany result", "content", result);
    return result;
  } catch (error) {
    consoleLog("findMany fn error", "error", error?.message ?? error);
  } finally {
    consoleLog("Leaving findMany fn", "Title");
  }
};

export const create = async (module, data, options = null) => {
  consoleLog(`Entering create fn for ${module}`, "title", data);
  try {
    const result = await prisma[module].create({
      data,
      ...(options || {}),
    });
    consoleLog(`${module} ${data.name} created successfully`, "result", result);
    return result;
  } catch (error) {
    consoleLog("create fn error", "error", error?.message ?? error);
  } finally {
    consoleLog("Leaving create fn", "Title");
  }
};

export const update = async (module, data, whereClause) => {
  consoleLog(`Entering update fn for ${module}`, "title", data);
  try {
    const result = await prisma[module].update({
      where: whereClause,
      data,
    });

    consoleLog(`${module} ${data.name} created successfully`, "result", result);
    return result;
  } catch (error) {
    consoleLog("update fn error", "error", error?.message ?? error);
  } finally {
    consoleLog("Leaving update fn", "Title");
  }
};
