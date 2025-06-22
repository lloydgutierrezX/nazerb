import { consoleLog } from "../utils.js";
import {
  create,
  findMany,
  findUnique,
  update,
  validateDuplicate,
} from "../hepers/index.js";

const module = "task";

// Function to create a new task
export const createTask = async (req, res) => {
  consoleLog("Entering createTask fn", "title");
  const { name, description, active, code } = req.body;

  try {
    if (
      await validateDuplicate(module, {
        name: { equals: name, mode: "insensitive" },
      })
    ) {
      return res
        .status(409)
        .json({ message: `Task ${name} is already taken`, fields: ["name"] });
    }

    if (await validateDuplicate(module, { code })) {
      return res
        .status(409)
        .json({ message: `Task ${code} is already taken`, fields: ["code"] });
    }

    // Create the new module
    const newTask = await create(module, {
      name,
      active,
      code,
      description,
    });

    // Return the created module
    return res.status(201).json(newTask);
  } catch (error) {
    consoleLog(error, "error");

    // If the module does not exist, return a 404 error
    return res.status(500).json({ message: "Failed to create module" });
  } finally {
    consoleLog("Leaving createTask fn", "title");
  }
};

// Function to get all task
export const getTasks = async (req, res) => {
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
    console.log("Leaving getTasks fn", "title");
  }
};

// Function to update a task
export const updateTask = async (req, res) => {
  console.log(`Updating task with ID: ${req.params.id}`);

  // Check if the ID is a valid number
  const { id } = req.params;
  if (isNaN(id)) {
    consoleLog(`Invalid task ID: ${id}`);
    return res.status(400).json({ message: "Invalid task ID" });
  }

  const { name, description, active, code } = req.body;
  const unique = await findUnique(module, { id: parseInt(id) });

  // Check if the task exists
  if (!unique) {
    // If the task does not exist, return a 404 error
    return res.status(404).json({ message: "Task not found" });
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
      .json({ message: `Task ${name} is taken already.`, fields: ["name"] });
  }

  if (
    code !== unique.code &&
    (await validateDuplicate(module, {
      AND: [{ code }, { id: { not: parseInt(unique.id) } }],
    }))
  ) {
    return res
      .status(409)
      .json({ message: `Task ${code} is taken already.`, fields: ["code"] });
  }

  try {
    // Update the task
    consoleLog(`Updating task with ID ${id}`);

    // Check if the task name already exists
    if (name === unique.name && id != unique.id) {
      return res
        .status(409)
        .json({ message: `Task ${name} is already taken`, fields: ["name"] });
    }

    // Update the task
    const taskData = {
      active,
      description,
      name,
      code,
    };

    if (name !== unique.name) {
      taskData.name = name;
    }
    const updatedTask = await update(module, taskData, {
      id: parseInt(id),
    });

    // Return the updated task
    return res.status(200).json(updatedTask);
  } catch (error) {
    consoleLog(error, "error");
    // If the task does not exist, return a 404 error
    return res.status(500).json({ message: "Failed to update task" });
  } finally {
    consoleLog("Leaving updateTask fn", "title");
  }
};

// Function to SOFT delete a module
export const deleteTask = async (req, res) => {
  consoleLog(`Soft deleting task with ID: ${req.params.id}`, "title");

  // Check if the ID is a valid number
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  // Check if the task exists
  if (!(await findUnique(module, { id: parseInt(id) }))) {
    // If the task does not exist, return a 404 error
    return res.status(404).json({ message: "Task not found" });
  }

  try {
    // Soft delete the task by updating its active to false
    const deletedTask = await update(
      module,
      { active: false },
      { id: parseInt(id) }
    );
    // Return the deleted task
    return res.status(200).json(deletedTask);
  } catch (error) {
    console.log(`Soft deleting task with ID ${id} failed`, error);
    // If the task does not exist, return a 404 error
    return res.status(500).json({ message: "Failed to delete task" });
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
