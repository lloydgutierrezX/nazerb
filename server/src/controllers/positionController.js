import { consoleLog } from "../utils.js";
import { create, findMany, findUnique, update } from "./helper.js";

const module = "position";

// Function to create a new position
export const createPosition = async (req, res) => {
  consoleLog("Entering createPosition fn", "title");
  const { name, description, active } = req.body;

  try {
    if (await findUnique(module, { name: name })) {
      return res.status(409).json({
        message: `Position ${name} is already taken`,
        fields: ["name"],
      });
    }

    // Create the new position
    const newPosition = await create(module, {
      name,
      active,
      description,
    });

    // Return the created position
    return res.status(201).json(newPosition);
  } catch (error) {
    consoleLog(error, "error");

    // If the position does not exist, return a 404 error
    return res.status(500).json({ message: "Failed to create position" });
  } finally {
    consoleLog("Leaving createPosition fn", "title");
  }
};

// Function to get all position
export const getPosition = async (req, res) => {
  consoleLog("Fetching all position", "title");

  try {
    const position = await findMany(module, {
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(position);
  } catch (error) {
    consoleLog(error, "error");

    // If the position do not exist, return a 404 error
    return res.status(500).json({ message: "Failed to fetch position" });
  } finally {
    console.log("Leaving getPosition fn", "title");
  }
};

// Function to update a position
export const updatePosition = async (req, res) => {
  console.log(`Updating position with ID: ${req.params.id}`);

  // Check if the ID is a valid number
  const { id } = req.params;
  if (isNaN(id)) {
    consoleLog(`Invalid position ID: ${id}`);
    return res.status(400).json({ message: "Invalid position ID" });
  }

  const { name, description, active } = req.body;
  const unique = await findUnique(module, { id: parseInt(id) });

  // Check if the position exists
  if (!unique) {
    // If the position does not exist, return a 404 error
    return res.status(404).json({ message: "Position not found" });
  }

  try {
    // Update the position
    consoleLog(`Updating position with ID ${id}`);

    // Check if the position name already exists
    if (name === unique.name && id != unique.id) {
      return res
        .status(409)
        .json({ message: `Module ${name} is already taken`, fields: ["name"] });
    }

    // Update the position
    const positionData = {
      active,
      description,
    };

    if (name !== unique.name) {
      positionData.name = name;
    }
    const updatedPosition = await update(module, positionData, {
      id: parseInt(id),
    });

    // Return the updated position
    return res.status(200).json(updatedPosition);
  } catch (error) {
    consoleLog(error, "error");
    // If the position does not exist, return a 404 error
    return res.status(500).json({ message: "Failed to update position" });
  } finally {
    consoleLog("Leaving getPositions fn", "title");
  }
};

// Function to SOFT delete an position
export const deletePosition = async (req, res) => {
  consoleLog(`Soft deleting position with ID: ${req.params.id}`, "title");

  // Check if the ID is a valid number
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid position ID" });
  }

  // Check if the position exists
  if (!(await findUnique(module, { id: parseInt(id) }))) {
    // If the position does not exist, return a 404 error
    return res.status(404).json({ message: "Position not found" });
  }

  try {
    // Soft delete the position by updating its active to false
    const deletedModule = await update(
      module,
      { active: false },
      { id: parseInt(id) }
    );
    // Return the deleted position
    return res.status(200).json(deletedModule);
  } catch (error) {
    console.log(`Soft deleting position with ID ${id} failed`, error);
    // If the position does not exist, return a 404 error
    return res.status(500).json({ message: "Failed to delete position" });
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
