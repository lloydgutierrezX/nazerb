import { consoleLog } from "../utils.js";
import {
  create,
  findMany,
  findUnique,
  update,
  validateDuplicate,
} from "../hepers/index.js";

const module = "employeeType";

// Function to create a new employee type
export const createEmployeeType = async (req, res) => {
  consoleLog("Entering createEmployeeType fn", "title");
  const { name, description, code, active } = req.body;

  try {
    if (await validateDuplicate(module, { code })) {
      return res.status(409).json({
        message: `Employee type ${code} is already taken`,
        fields: ["code"],
      });
    }
    if (
      await validateDuplicate(module, {
        name: { equals: name, mode: "insensitive" },
      })
    ) {
      return res.status(409).json({
        message: `Employee type ${name} is already taken`,
        fields: ["name"],
      });
    }

    // Create the new employee type
    const newEmployeeType = await create(module, {
      name,
      code,
      active,
      description,
    });

    // Return the created employee type
    return res.status(201).json(newEmployeeType);
  } catch (error) {
    consoleLog(error, "error");

    // If the employee type does not exist, return a 404 error
    return res.status(500).json({ message: "Failed to create employee type" });
  } finally {
    consoleLog("Leaving createEmployeeType fn", "title");
  }
};

// Function to get all employee types
export const getEmployeeTypes = async (req, res) => {
  consoleLog("Fetching all getEmployeeTypes", "title");

  try {
    const getEmployeeTypes = await findMany(module, {
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(getEmployeeTypes);
  } catch (error) {
    consoleLog(error, "error");

    // If the employee type do not exist, return a 404 error
    return res.status(500).json({ message: "Failed to fetch employee type" });
  } finally {
    console.log("Leaving getEmployeeTypes fn", "title");
  }
};

// Function to update a employee type
export const updateEmployeeType = async (req, res) => {
  console.log(`Updating employee type with ID: ${req.params.id}`);

  // Check if the ID is a valid number
  const { id } = req.params;
  if (isNaN(id)) {
    consoleLog(`Invalid employeeType ID: ${id}`);
    return res.status(400).json({ message: "Invalid employee type ID" });
  }

  const { name, description, active, code } = req.body;
  const unique = await findUnique(module, { id: parseInt(id) });

  // Check if the Employee type exists
  if (!unique) {
    // If the Employee type does not exist, return a 404 error
    return res.status(404).json({ message: "Employee type not found" });
  }

  if (
    name !== unique.name &&
    (await validateDuplicate(module, {
      AND: [
        { name: { equals: name, mode: "insensitive" } },
        { id: { not: parseInt(unique.id) } },
      ],
    }))
  ) {
    return res
      .status(409)
      .json({ message: `Name ${name} is taken already.`, fields: ["name"] });
  }

  if (
    code !== unique.code &&
    (await validateDuplicate(module, {
      AND: [{ code }, { id: { not: parseInt(unique.id) } }],
    }))
  ) {
    return res
      .status(409)
      .json({ message: `Code ${code} is taken already.`, fields: ["code"] });
  }

  try {
    // Update the Employee type
    consoleLog(`Updating Employee type with ID ${id}`);

    // Update the employee type
    const employeeTypeData = {
      active,
      description,
    };

    if (name !== unique.name) {
      employeeTypeData.name = name;
    }

    if (name !== unique.name) {
      employeeTypeData.code = code;
    }

    const updatedEmployeeType = await update(module, employeeTypeData, {
      id: parseInt(id),
    });

    // Return the updated employee type
    return res.status(200).json(updatedEmployeeType);
  } catch (error) {
    consoleLog(error, "error");
    // If the employee type does not exist, return a 404 error
    return res.status(500).json({ message: "Failed to update employee type" });
  } finally {
    consoleLog("Leaving updateEmployeeType fn", "title");
  }
};

// Function to SOFT delete a employee type
export const deleteEmployeeType = async (req, res) => {
  consoleLog(`Soft deleting employee type with ID: ${req.params.id}`, "title");

  // Check if the ID is a valid number
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid employee type ID" });
  }

  // Check if the employee type exists
  if (!(await findUnique(module, { id: parseInt(id) }))) {
    // If the employee type does not exist, return a 404 error
    return res.status(404).json({ message: "Employee type not found" });
  }

  try {
    // Soft delete the employee type by updating its active to false
    const deletedEmployeeType = await update(
      module,
      { active: false },
      { id: parseInt(id) }
    );
    // Return the deleted employee type
    return res.status(200).json(deletedEmployeeType);
  } catch (error) {
    console.log(`Soft deleting employee type with ID ${id} failed`, error);
    // If the employee type does not exist, return a 404 error
    return res.status(500).json({ message: "Failed to delete employee type" });
  }
};
