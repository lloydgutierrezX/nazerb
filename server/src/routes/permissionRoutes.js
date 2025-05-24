import express from "express";
import {
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
  retrievePermission,
} from "../controllers/permissionsController.js";

const permissionRoutes = express.Router();

// Route to create a new permission
permissionRoutes.post("/", createPermission);

// Route to get all permissions
permissionRoutes.get("/", getPermissions);

// Route to get a permission by ID
permissionRoutes.get("/:id", getPermissionById);

// Route to update a permission by ID
permissionRoutes.put("/:id", updatePermission);

// Route to delete a permission by ID
permissionRoutes.delete("/:id", deletePermission);

// Route to retrieve deleted permission by ID
permissionRoutes.put("/retrieve/:id", retrievePermission);

export default permissionRoutes;
