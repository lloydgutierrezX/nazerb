import express from "express";
import {
  createRole,
  getRoles,
  updateRole,
  deleteRole,
  retrieveRole,
} from "../controllers/rolesController.js";

const roleRoutes = express.Router();

// Route to create a new module
roleRoutes.post("/", createRole);

// Route to get all roles
roleRoutes.get("/", getRoles);

// Route to get a module by ID
// roleRoutes.get("/:id", getRoleById);

// Route to update a module by ID
roleRoutes.put("/:id", updateRole);

// Route to delete a module by ID
roleRoutes.delete("/:id", deleteRole);

roleRoutes.put("/retrieve/:id", retrieveRole);

export default roleRoutes;
