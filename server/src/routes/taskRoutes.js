import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const roleRoutes = express.Router();

// Route to create a new module
roleRoutes.post("/", createTask);

// Route to get all roles
roleRoutes.get("/", getTasks);

// Route to update a module by ID
roleRoutes.put("/:id", updateTask);

// Route to delete a module by ID
roleRoutes.delete("/:id", deleteTask);

roleRoutes.put("/retrieve/:id", updateTask);

export default roleRoutes;
