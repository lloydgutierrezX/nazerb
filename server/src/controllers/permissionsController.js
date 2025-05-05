import { PrismaClient } from "#root/generated/prisma/client.js";

const prisma = new PrismaClient();

// Function to create a new permission
export const createPermission = async (req, res) => {
  console.log("Creating a new permission");

  const { name, description } = req.body;

  try {
    // Check if the permission name already exists
    console.log(`Checking if permission name ${name} already exists`);
    if (
      await prisma.permission.findUnique({
        where: {
          name,
        },
      })
    ) {
      console.log(`Permission name ${name} already exists`);
      res.status(409).json({ error: `Permission ${name} already taken` });
    }

    console.log(
      `Processing create permission with name ${name} and description ${description}`
    );
    // Create the new permission
    const newPermission = await prisma.permission.create({
      data: {
        name,
        description,
      },
    });

    console.log(`Permission ${name} created successfully`);
    // Return the created permission
    res.status(201).json(newPermission);
  } catch (error) {
    console.log("Creating permission failed", error);

    // If the permission does not exist, return a 404 error
    res.status(500).json({ error: "Failed to create permission" });
  }
};

// Function to get all permissions
export const getPermissions = async (req, res) => {
  console.log("Fetching all permissions");
  // Fetch all permissions

  try {
    const permissions = await prisma.permission.findMany({
      where: { active: true },
      orderBy: { active: "asc" },
    });
    console.log("Permissions fetched successfully");
    // Return the permissions

    res.status(200).json(permissions);
  } catch (error) {
    console.log("Fetching all permissions failed", error);

    // If the permissions do not exist, return a 404 error
    res.status(500).json({ error: "Failed to fetch permissions" });
  }
};

// Function to get a permission by ID
export const getPermissionById = async (req, res) => {
  console.log(`Fetching permission by ID: ${req.params.id}`);

  // Check if the ID is a valid number
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid permission ID" });
  }

  // Fetch the permission by ID
  try {
    const permission = await prisma.permission.findUnique({
      where: { id: parseInt(id) },
    });

    // Check if the permission exists
    console.log(`Permission with ID ${id} fetched successfully`);
    if (!permission) {
      return res.status(404).json({ error: "Permission not found" });
    }

    // Return the permission
    console.log(`Permission with ID ${id} found`);
    res.status(200).json(permission);
  } catch (error) {
    console.log(`Fetching permission with ID ${id} failed`, error);

    // If the permission does not exist, return a 404 error
    res.status(500).json({ error: "Failed to fetch permission" });
  }
};

// Function to update a permission
export const updatePermission = async (req, res) => {
  console.log(`Updating permission with ID: ${req.params.id}`);

  // Check if the ID is a valid number
  const { id } = req.params;
  if (isNaN(id)) {
    console.log(`Invalid permission ID: ${id}`);
    return res.status(400).json({ error: "Invalid permission ID" });
  }

  const { name, description } = req.body;
  // Check if the permission exists
  console.log(`Checking if permission with ID ${id} exists`);
  if (
    !(await prisma.permission.findUnique({
      where: { id: parseInt(id) },
    }))
  ) {
    // If the permission does not exist, return a 404 error
    console.log(`Permission with ID ${id} not found`);
    return res.status(404).json({ error: "Permission not found" });
  }

  try {
    // Update the permission
    console.log(`Updating permission with ID ${id}`);

    // Check if the permission name already exists
    if (
      await prisma.permission.findUnique({
        where: {
          name,
        },
      })
    ) {
      console.log(`Permission name ${name} already exists`);
      res.status(409).json({ error: `Permission ${name} already taken` });
    }

    // Update the permission
    console.log(`Processing update of permission with ID ${id}`);

    const updatedPermission = await prisma.permission.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
      },
    });

    console.log(`Permission with ID ${id} updated successfully`);

    // Return the updated permission
    res.status(200).json(updatedPermission);
  } catch (error) {
    console.log(`Updating permission with ID ${id} failed`, error);
    // If the permission does not exist, return a 404 error
    res.status(500).json({ error: "Failed to update permission" });
  }
};

// Function to SOFT delete a permission
export const deletePermission = async (req, res) => {
  console.log(`Soft deleting permission with ID: ${req.params.id}`);

  // Check if the ID is a valid number
  const { id } = req.params;

  if (isNaN(id)) {
    console.log(`Invalid permission ID: ${id}`);
    return res.status(400).json({ error: "Invalid permission ID" });
  }

  // Check if the permission exists
  console.log(`Checking if permission with ID ${id} exists`);

  if (
    !(await prisma.permission.findUnique({
      where: { id: parseInt(id) },
    }))
  ) {
    console.log(`Permission with ID ${id} not found`);

    // If the permission does not exist, return a 404 error
    return res.status(404).json({ error: "Permission not found" });
  }
  try {
    // Soft delete the permission
    console.log(`processing soft delete of permission with ID ${id}`);

    const deletedPermission = await prisma.permission.update({
      where: { id: parseInt(id) },
      data: { active: false },
    });

    console.log(`Permission with ID ${id} soft deleted successfully`);

    // Return the deleted permission
    res.status(200).json(deletedPermission);
  } catch (error) {
    console.log(`Soft deleting permission with ID ${id} failed`, error);

    // If the permission does not exist, return a 404 error
    res.status(500).json({ error: "Failed to delete permission" });
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
