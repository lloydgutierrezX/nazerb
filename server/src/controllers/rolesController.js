import { PrismaClient } from "#root/generated/prisma/client.js";

const prisma = new PrismaClient();

// Function to create a new role
export const createRole = async (req, res) => {
  console.log("Creating a new role");

  const { name, description, active } = req.body;

  try {
    // Check if the role name already exists
    console.log(`Checking if role name ${name} already exists`);
    if (
      await prisma.role.findUnique({
        where: {
          name,
          active,
          description,
        },
      })
    ) {
      console.log(`Role name ${name} already exists`);
      res.status(409).json({ error: `Role ${name} already taken` });
    }

    console.log(
      `Processing create role with name ${name} and description ${description}`
    );
    // Create the new role
    const newRole = await prisma.role.create({
      data: {
        name,
        active,
        description,
      },
    });

    console.log(`Role ${name} created successfully`);
    // Return the created role
    res.status(201).json(newRole);
  } catch (error) {
    console.log("Creating role failed", error);

    // If the role does not exist, return a 404 error
    res.status(500).json({ error: "Failed to create role" });
  }
};

// Function to get all roles
export const getRoles = async (req, res) => {
  console.log("Fetching all roles");
  // Fetch all roles

  try {
    const roles = await prisma.role.findMany({
      // where: { active: true },
      orderBy: { createdAt: "desc" },
    });
    console.log("Roles fetched successfully");
    // Return the roles

    res.status(200).json(roles);
  } catch (error) {
    console.log("Fetching all roles failed", error);

    // If the roles do not exist, return a 404 error
    res.status(500).json({ error: "Failed to fetch roles" });
  }
};

// Function to get a role by ID
export const getRoleById = async (req, res) => {
  console.log(`Fetching role by ID: ${req.params.id}`);

  // Check if the ID is a valid number
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid role ID" });
  }

  // Fetch the role by ID
  try {
    const role = await prisma.role.findUnique({
      where: { id: parseInt(id) },
    });

    // Check if the role exists
    console.log(`Role with ID ${id} fetched successfully`);
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    // Return the role
    console.log(`Role with ID ${id} found`);
    res.status(200).json(role);
  } catch (error) {
    console.log(`Fetching role with ID ${id} failed`, error);

    // If the role does not exist, return a 404 error
    res.status(500).json({ error: "Failed to fetch role" });
  }
};

// Function to update a role
export const updateRole = async (req, res) => {
  console.log(`Updating role with ID: ${req.params.id}`);

  // Check if the ID is a valid number
  const { id } = req.params;
  if (isNaN(id)) {
    console.log(`Invalid role ID: ${id}`);
    return res.status(400).json({ error: "Invalid role ID" });
  }

  const { name, description, active } = req.body;

  const role = await prisma.role.findUnique({
    where: { id: parseInt(id) },
  });

  // Check if the role exists
  console.log(`Checking if role with ID ${id} exists`);
  if (!role) {
    // If the role does not exist, return a 404 error
    console.log(`Role with ID ${id} not found`);
    return res.status(404).json({ error: "Role not found" });
  }

  try {
    // Update the role
    console.log(`Updating role with ID ${id}`);

    // Check if the role name already exists
    if (name === role.name && id != role.id) {
      console.log(`Role name ${name} already exists`);
      res
        .status(409)
        .json({ message: `Role ${name} is already taken`, fields: ["name"] });
    }
    console.log(`Role name ${name} don't exist.`);

    // Update the role
    console.log(`Processing update of role with ID ${id}`);

    const roleData = {
      active,
      description,
    };
    if (name !== role.name) {
      roleData.name = name;
    }

    const updatedRole = await prisma.role.update({
      where: { id: parseInt(id) },
      data: roleData,
    });

    console.log(`Role with ID ${id} updated successfully`);

    // Return the updated role
    res.status(200).json(updatedRole);
  } catch (error) {
    console.log(`Updating role with ID ${id} failed`, error);
    // If the role does not exist, return a 404 error
    res.status(500).json({ error: "Failed to update role" });
  }
};

// Function to SOFT delete a role
export const deleteRole = async (req, res) => {
  console.log(`Soft deleting role with ID: ${req.params.id}`);

  // Check if the ID is a valid number
  const { id } = req.params;

  if (isNaN(id)) {
    console.log(`Invalid role ID: ${id}`);
    return res.status(400).json({ error: "Invalid role ID" });
  }

  // Check if the role exists
  console.log(`Checking if role with ID ${id} exists`);

  if (
    !(await prisma.role.findUnique({
      where: { id: parseInt(id) },
    }))
  ) {
    console.log(`Role with ID ${id} not found`);

    // If the role does not exist, return a 404 error
    return res.status(404).json({ error: "Role not found" });
  }
  try {
    // Soft delete the role
    console.log(`processing soft delete of role with ID ${id}`);

    const deletedRole = await prisma.role.update({
      where: { id: parseInt(id) },
      data: { active: false },
    });

    console.log(`Role with ID ${id} soft deleted successfully`);

    // Return the deleted role
    res.status(200).json(deletedRole);
  } catch (error) {
    console.log(`Soft deleting role with ID ${id} failed`, error);

    // If the role does not exist, return a 404 error
    res.status(500).json({ error: "Failed to delete role" });
  }

  // We do not hard delete data.
  // try {
  //   await prisma.role.delete({
  //     where: { id: parseInt(id) },
  //   });
  //   res.status(204).send();
  // } catch (error) {
  //   res.status(500).json({ error: "Failed to delete role" });
  // }
};
