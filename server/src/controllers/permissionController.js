import { PrismaClient } from "#root/generated/prisma/client.js";
import { consoleLog } from "../utils.js";
import { create, findMany, findUnique, update } from "./helper.js";

const prisma = new PrismaClient();

const module = "permission";

// Function to create a new permission
export const createPermission = async (req, res) => {
  consoleLog("Entering createPermission fn", "title");

  const { action, active, description } = req.body;
  const moduleId = parseInt(req.body.moduleId);

  try {
    // checking if moduleId exist in module
    if (!(await findUnique("module", { id: moduleId }))) {
      return res.status(409).json({
        error: `Module does not exist`,
        fields: ["moduleId"],
      });
    }

    const record = await findMany(module, { where: { action, moduleId } });
    if (record.length !== 0) {
      return res.status(409).json({
        error: `Permission ${action}:${module} already taken`,
        fields: ["action", "moduleId"],
      });
    }

    // Create the new permission
    const newPermission = await create(module, {
      action,
      moduleId,
      description,
      active,
    });

    // Return the created permission
    return res.status(201).json(newPermission);
  } catch (error) {
    consoleLog(error, "error");

    // If the permission does not exist, return a 404 error
    return res.status(500).json({ error: "Failed to create permission" });
  } finally {
    consoleLog("Leaving createPermissions fn", "title");
  }
};

// Function to get all permissions
export const getPermissions = async (req, res) => {
  consoleLog("Fetching all modules", "title");
  // Fetch all permissions

  try {
    const permissions = await findMany(module, {
      include: {
        module: true,
      },
      orderBy: { createdAt: "desc" },
      where: {
        // active: true,
        module: {
          active: true,
        },
      },
    });

    return res.status(200).json(permissions);
  } catch (error) {
    consoleLog(error, "error");

    // If the permissions do not exist, return a 404 error
    return res.status(500).json({ error: "Failed to fetch permissions" });
  } finally {
    console.log("Leaving getPermissions fn", "title");
  }
};

// Function to get a permission by ID
export const getPermissionById = async (req, res) => {
  consoleLog(`Fetching permission by ID: ${req.params.id}`, "title");

  // Check if the ID is a valid number
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid permission ID" });
  }

  // Fetch the permission by ID
  try {
    const permission = await findUnique(module, { id: parseInt(id) });
    if (!permission) {
      return res.status(404).json({ error: "Permission not found" });
    }

    // Return the permission
    return res.status(200).json(permission);
  } catch (error) {
    consoleLog(error, "error");

    // If the permission does not exist, return a 404 error
    res.status(500).json({ error: "Failed to fetch permission" });
  }
};

// Function to update a permission
export const updatePermission = async (req, res) => {
  console.log(`Updating module with ID: ${req.params.id}`, "title");
  const { action, description, active } = req.body;
  const moduleId = parseInt(req.body.moduleId);

  // Check if the ID is a valid number
  const { id } = req.params;
  if (isNaN(id)) {
    consoleLog(`Invalid module ID: ${id}`);
    return res.status(400).json({ error: "Invalid permission ID" });
  }

  if (!moduleId) {
    return res.status(400).json({ error: "Module not found." });
  }

  // Check if module exist via moduleId
  // if moduleId is undefined, meaning this will be for retrieve request
  const uniqueModule = await findUnique("module", { id: moduleId });
  if (!uniqueModule) {
    return res.status(404).json({ message: "Module not found" });
  }

  // Check if the permission exists
  const uniquePermission = await findUnique(module, { id: parseInt(id) });
  if (!uniquePermission) {
    // If the permission does not exist, return a 404 error
    return res.status(404).json({ error: "Permission not found" });
  }

  try {
    // Update the permission
    console.log(`Processing update of permission with ID ${id}`);

    const permissionData = {
      active,
      description,
    };

    if (moduleId !== uniquePermission.moduleId || id !== uniquePermission.id) {
      permissionData.moduleId = moduleId;
    }

    if (action !== uniquePermission.action || id !== uniquePermission.id) {
      permissionData.action = action;
    }

    const updatedPermission = await prisma.permission.update({
      where: { id: parseInt(id) },
      data: permissionData,
    });

    // Return the updated permission
    res.status(200).json(updatedPermission);
  } catch (error) {
    consoleLog(error, "error");
    // If the permission does not exist, return a 404 error
    res.status(500).json({ error: "Failed to update permission" });
  } finally {
    consoleLog("Leaving updatePermission fn", "title");
  }
};

// Function to SOFT delete a permission
export const deletePermission = async (req, res) => {
  consoleLog(`Soft deleting permission with ID: ${req.params.id}`, "title");

  // Check if the ID is a valid number
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid permission ID" });
  }

  // Check if the permission exists
  if (!(await findUnique(module, { id: parseInt(id) }))) {
    // If the permission does not exist, return a 404 error
    return res.status(404).json({ error: "Permission not found" });
  }

  try {
    // Soft delete the permission
    const deletedPermission = await update(
      module,
      { active: false },
      { id: parseInt(id) }
    );
    // Return the deleted permission
    return res.status(200).json(deletedPermission);
  } catch (error) {
    console.log(error, "error");

    // If the permission does not exist, return a 404 error
    return res.status(500).json({ error: "Failed to delete permission" });
  } finally {
    console.log("Leaving deletePermission fn.", "title");
  }

  // We do not hard delete data.
  // try {
  //   await prisma.permission.delete({
  //     where: { id: parseInt(id) },
  //   });
  //   res.status(204).send();
  // } catch (error) {
  //   res.status(500).json({ error: "Failed to delete permission" });
  // }
};

export const retrievePermission = async (req, res) => {
  consoleLog(
    `Retrieving soft deleted permission with ID: ${req.params.id}`,
    "title"
  );

  // Check if the ID is a valid number
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid permission ID" });
  }

  // Check if the permission exists
  if (!(await findUnique(module, { id: parseInt(id) }))) {
    // If the permission does not exist, return a 404 error
    return res.status(404).json({ error: "Permission not found" });
  }

  try {
    // Soft delete the permission
    const retrievedPermission = await update(
      module,
      { active: true },
      { id: parseInt(id) }
    );
    // Return the deleted permission
    return res.status(200).json(retrievedPermission);
  } catch (error) {
    console.log(error, "error");

    // If the permission does not exist, return a 404 error
    return res.status(500).json({ error: "Failed to delete permission" });
  } finally {
    console.log("Leaving deletePermission fn.", "title");
  }
};
