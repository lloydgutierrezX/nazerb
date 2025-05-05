import express from "express";
import {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
} from "../controllers/rolesController.js";

const rolesRoutes = express.Router();

// Route to create a new module
rolesRoutes.post("/", createRole);

// Route to get all roles
rolesRoutes.get("/", getRoles);

// Route to get a module by ID
rolesRoutes.get("/:id", getRoleById);

// Route to update a module by ID
rolesRoutes.put("/:id", updateRole);

// Route to delete a module by ID
rolesRoutes.delete("/:id", deleteRole);

export default rolesRoutes;
