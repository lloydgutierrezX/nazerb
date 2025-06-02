import { consoleLog } from "../utils.js";
import { create, findMany, findUnique, update } from "./helper.js";

const module = "role";

// Function to create a new role
export const createRole = async (req, res) => {
  consoleLog("Entering createRole fn", "title");

  const { name, description, active, permissions } = req.body;

  try {
    if (!Array.isArray(permissions)) {
      return res
        .status(409)
        .json({ message: "Permissions must be an array of permission id." });
    }

    if (await findUnique(module, { name: name })) {
      return res
        .status(409)
        .json({ message: `Module ${name} is already taken`, fields: ["name"] });
    }

    // Create the new role
    const newPermission = await create(module, {
      name,
      active,
      description,
      rolePermission: {
        create: permissions,
      },
    });

    // Return the created role
    return res.status(201).json(newPermission);
  } catch (error) {
    consoleLog(error, "error");

    // If the role does not exist, return a 404 error
    return res.status(500).json({ message: "Failed to create role" });
  } finally {
    consoleLog("Leaving createModule fn", "title");
  }
};

// Function to get all roles
export const getRoles = async (req, res) => {
  consoleLog("Fetching all roles", "title");

  try {
    const roles = await findMany(module, {
      orderBy: { createdAt: "desc" },
      include: {
        rolePermission: true,
      },
    });
    return res.status(200).json(roles);
  } catch (error) {
    consoleLog(error, "error");

    // If the roles do not exist, return a 404 error
    return res.status(500).json({ message: "Failed to fetch roles" });
  } finally {
    console.log("Leaving getModules fn", "title");
  }
};

// Function to update a role
export const updateRole = async (req, res) => {
  console.log(`Updating roles with ID: ${req.params.id}`);

  // Check if the ID is a valid number
  const { id } = req.params;
  if (isNaN(id)) {
    consoleLog(`Invalid role ID: ${id}`);
    return res.status(400).json({ message: "Invalid role ID" });
  }

  const { name, description, active, permissions } = req.body;
  const unique = await findUnique(module, { id: parseInt(id) });

  // Check if the role exists
  if (!unique) {
    // If the role does not exist, return a 404 error
    return res.status(404).json({ message: "Role not found" });
  }

  try {
    // Update the role
    consoleLog(`Updating role with ID ${id}`);

    // Check if the role name already exists
    if (name === unique.name && id != unique.id) {
      return res.status(409).json({
        message: `Permission ${name} is already taken`,
        fields: ["name"],
      });
    }

    // Update the role
    const roleData = {
      active,
      description,
      // include: { roles: true },
      rolePermission: {
        deleteMany: {
          roleId: parseInt(id),
        },
      },
    };

    if (name && name !== unique.name) {
      roleData.name = name;
    }

    if (permissions) {
      roleData.rolePermission.createMany = {
        data: permissions,
      };
    }

    const updatedRole = await update(module, roleData, {
      id: parseInt(id),
    });

    // Return the updated role
    return res.status(200).json(updatedRole);
  } catch (error) {
    consoleLog(error, "error");
    // If the role does not exist, return a 404 error
    return res.status(500).json({ message: "Failed to update role" });
  } finally {
    consoleLog("Leaving updateRole fn", "title");
  }
};

// Function to SOFT delete a role
export const deleteRole = async (req, res) => {
  consoleLog(`Soft deleting role with ID: ${req.params.id}`, "title");

  // Check if the ID is a valid number
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid role ID" });
  }

  // Check if the module exists
  if (!(await findUnique(module, { id: parseInt(id) }))) {
    // If the module does not exist, return a 404 error
    return res.status(404).json({ message: "Role not found" });
  }

  try {
    // Soft delete the module by updating its active to false
    const deletedRole = await update(
      module,
      { active: false },
      { id: parseInt(id) }
    );
    // Return the deleted module
    return res.status(200).json(deletedRole);
  } catch (error) {
    console.log(`Soft deleting module with ID ${id} failed`, error);
    // If the module does not exist, return a 404 error
    return res.status(500).json({ message: "Failed to delete module" });
  }
};

export const retrieveRole = async (req, res) => {
  consoleLog(`Retrieving soft deleted role with ID: ${req.params.id}`, "title");

  // Check if the ID is a valid number
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid role ID" });
  }

  // Check if the role exists
  if (!(await findUnique(module, { id: parseInt(id) }))) {
    // If the role does not exist, return a 404 error
    return res.status(404).json({ error: "Role not found" });
  }

  try {
    // Soft delete the role
    const retrievedPermission = await update(
      module,
      { active: true },
      { id: parseInt(id) }
    );
    // Return the deleted role
    return res.status(200).json(retrievedPermission);
  } catch (error) {
    console.log(error, "error");

    // If the role does not exist, return a 404 error
    return res.status(500).json({ error: "Failed to delete role" });
  } finally {
    console.log("Leaving deletePermission fn.", "title");
  }
};
