import express from "express";
import {
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
} from "../controllers/permissionsController.js";

const permissionRoutes = express.Router();

// Route to create a new module
permissionRoutes.post("/", createPermission);

// Route to get all permission
permissionRoutes.get("/", getPermissions);

// Route to get a module by ID
permissionRoutes.get("/:id", getPermissionById);

// Route to update a module by ID
permissionRoutes.put("/:id", updatePermission);

// Route to delete a module by ID
permissionRoutes.delete("/:id", deletePermission);

export default permissionRoutes;
