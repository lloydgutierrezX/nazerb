import { consoleLog } from "../utils.js";
import { create, findMany, findUnique, update } from "./helper.js";

const module = "module";

// Function to create a new module
export const createModule = async (req, res) => {
  consoleLog("Entering createModule fn", "title");
  const { name, description, active, link } = req.body;

  try {
    if (await findUnique(module, { name: name })) {
      return res
        .status(409)
        .json({ message: `Module ${name} is already taken`, fields: ["name"] });
    }

    // Create the new module
    const newModule = await create(module, {
      name,
      active,
      description,
      link,
    });

    // Return the created module
    return res.status(201).json(newModule);
  } catch (error) {
    consoleLog(error, "error");

    // If the module does not exist, return a 404 error
    return res.status(500).json({ message: "Failed to create module" });
  } finally {
    consoleLog("Leaving createModule fn", "title");
  }
};

// Function to get all modules
export const getModules = async (req, res) => {
  consoleLog("Fetching all modules", "title");

  try {
    const modules = await findMany(module, {
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(modules);
  } catch (error) {
    consoleLog(error, "error");

    // If the modules do not exist, return a 404 error
    return res.status(500).json({ message: "Failed to fetch modules" });
  } finally {
    console.log("Leaving getModules fn", "title");
  }
};

// Function to update a module
export const updateModule = async (req, res) => {
  console.log(`Updating module with ID: ${req.params.id}`);

  // Check if the ID is a valid number
  const { id } = req.params;
  if (isNaN(id)) {
    consoleLog(`Invalid module ID: ${id}`);
    return res.status(400).json({ message: "Invalid module ID" });
  }

  const { name, description, active, link } = req.body;
  const unique = await findUnique(module, { id: parseInt(id) });

  // Check if the module exists
  if (!unique) {
    // If the module does not exist, return a 404 error
    return res.status(404).json({ message: "Module not found" });
  }

  try {
    // Update the module
    consoleLog(`Updating module with ID ${id}`);

    // Check if the module name already exists
    if (name === unique.name && id != unique.id) {
      return res
        .status(409)
        .json({ message: `Module ${name} is already taken`, fields: ["name"] });
    }

    // Update the module
    const moduleData = {
      active,
      description,
      link,
    };

    if (name !== unique.name) {
      moduleData.name = name;
    }
    const updatedModule = await update(module, moduleData, {
      id: parseInt(id),
    });

    // Return the updated module
    return res.status(200).json(updatedModule);
  } catch (error) {
    consoleLog(error, "error");
    // If the module does not exist, return a 404 error
    return res.status(500).json({ message: "Failed to update module" });
  } finally {
    consoleLog("Leaving updateModule fn", "title");
  }
};

// Function to SOFT delete a module
export const deleteModule = async (req, res) => {
  consoleLog(`Soft deleting module with ID: ${req.params.id}`, "title");

  // Check if the ID is a valid number
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid module ID" });
  }

  // Check if the module exists
  if (!(await findUnique(module, { id: parseInt(id) }))) {
    // If the module does not exist, return a 404 error
    return res.status(404).json({ message: "Module not found" });
  }

  try {
    // Soft delete the module by updating its active to false
    const deletedModule = await update(
      module,
      { active: false },
      { id: parseInt(id) }
    );
    // Return the deleted module
    return res.status(200).json(deletedModule);
  } catch (error) {
    console.log(`Soft deleting module with ID ${id} failed`, error);
    // If the module does not exist, return a 404 error
    return res.status(500).json({ message: "Failed to delete module" });
  }

  // We do not hard delete data.
  // try {
  //   await prisma.module.delete({
  //     where: { id: parseInt(id) },
  //   });
  //   res.status(204).send();
  // } catch (error) {
  //   res.status(500).json({ message: "Failed to delete module" });
  // }
};
