import { PrismaClient } from "#root/generated/prisma/client.js";

const prisma = new PrismaClient();

// Function to create a new module
export const createModule = async (req, res) => {
  console.log("Creating a new module");

  const { name, description } = req.body;

  try {
    // Check if the module name already exists
    console.log(`Checking if module name ${name} already exists`);
    if (
      await prisma.module.findUnique({
        where: {
          name,
        },
      })
    ) {
      console.log(`Module name ${name} already exists`);
      res.status(409).json({ error: `Module ${name} already taken` });
    }

    console.log(
      `Processing create module with name ${name} and description ${description}`
    );
    // Create the new module
    const newModule = await prisma.module.create({
      data: {
        name,
        description,
      },
    });

    console.log(`Module ${name} created successfully`);
    // Return the created module
    res.status(201).json(newModule);
  } catch (error) {
    console.log("Creating module failed", error);

    // If the module does not exist, return a 404 error
    res.status(500).json({ error: "Failed to create module" });
  }
};

// Function to get all modules
export const getModules = async (req, res) => {
  console.log("Fetching all modules");

  try {
    const modules = await prisma.module.findMany({
      where: { active: true },
      orderBy: { active: "asc" },
    });
    res.status(200).json(modules);
  } catch (error) {
    console.log("Fetching all modules failed", error);

    // If the modules do not exist, return a 404 error
    res.status(500).json({ error: "Failed to fetch modules" });
  }
};

// Function to get a module by ID
export const getModuleById = async (req, res) => {
  console.log(`Fetching module by ID: ${req.params.id}`);

  // Check if the ID is a valid number
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid module ID" });
  }

  // Fetch the module by ID
  try {
    const module = await prisma.module.findUnique({
      where: { id: parseInt(id) },
    });

    // Check if the module exists
    console.log(`Module with ID ${id} fetched successfully`);
    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }

    // Return the module
    console.log(`Module with ID ${id} found`);
    res.status(200).json(module);
  } catch (error) {
    console.log(`Fetching module with ID ${id} failed`, error);

    // If the module does not exist, return a 404 error
    res.status(500).json({ error: "Failed to fetch module" });
  }
};

// Function to update a module
export const updateModule = async (req, res) => {
  console.log(`Updating module with ID: ${req.params.id}`);

  // Check if the ID is a valid number
  const { id } = req.params;
  if (isNaN(id)) {
    console.log(`Invalid module ID: ${id}`);
    return res.status(400).json({ error: "Invalid module ID" });
  }

  const { name, description } = req.body;
  // Check if the module exists
  console.log(`Checking if module with ID ${id} exists`);
  if (
    !(await prisma.module.findUnique({
      where: { id: parseInt(id) },
    }))
  ) {
    // If the module does not exist, return a 404 error
    console.log(`Module with ID ${id} not found`);
    return res.status(404).json({ error: "Module not found" });
  }

  try {
    // Update the module
    console.log(`Updating module with ID ${id}`);

    // Check if the module name already exists
    if (
      await prisma.module.findUnique({
        where: {
          name,
        },
      })
    ) {
      console.log(`Module name ${name} already exists`);
      res.status(409).json({ error: `Module ${name} already taken` });
    }

    // Update the module
    console.log(`Processing update of module with ID ${id}`);

    const updatedModule = await prisma.module.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
      },
    });

    console.log(`Module with ID ${id} updated successfully`);

    // Return the updated module
    res.status(200).json(updatedModule);
  } catch (error) {
    console.log(`Updating module with ID ${id} failed`, error);
    // If the module does not exist, return a 404 error
    res.status(500).json({ error: "Failed to update module" });
  }
};

// Function to SOFT delete a module
export const deleteModule = async (req, res) => {
  console.log(`Soft deleting module with ID: ${req.params.id}`);

  // Check if the ID is a valid number
  const { id } = req.params;

  if (isNaN(id)) {
    console.log(`Invalid module ID: ${id}`);
    return res.status(400).json({ error: "Invalid module ID" });
  }

  // Check if the module exists
  console.log(`Checking if module with ID ${id} exists`);

  if (
    !(await prisma.module.findUnique({
      where: { id: parseInt(id) },
    }))
  ) {
    console.log(`Module with ID ${id} not found`);

    // If the module does not exist, return a 404 error
    return res.status(404).json({ error: "Module not found" });
  }
  try {
    // Soft delete the module
    console.log(`processing soft delete of module with ID ${id}`);

    const deletedModule = await prisma.module.update({
      where: { id: parseInt(id) },
      data: { active: false },
    });

    console.log(`Module with ID ${id} soft deleted successfully`);

    // Return the deleted module
    res.status(200).json(deletedModule);
  } catch (error) {
    console.log(`Soft deleting module with ID ${id} failed`, error);

    // If the module does not exist, return a 404 error
    res.status(500).json({ error: "Failed to delete module" });
  }

  // We do not hard delete data.
  // try {
  //   await prisma.module.delete({
  //     where: { id: parseInt(id) },
  //   });
  //   res.status(204).send();
  // } catch (error) {
  //   res.status(500).json({ error: "Failed to delete module" });
  // }
};
