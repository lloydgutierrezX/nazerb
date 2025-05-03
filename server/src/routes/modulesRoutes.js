import express from "express";
import {
  createModule,
  getModules,
  getModuleById,
  updateModule,
  deleteModule,
} from "../controllers/modulesController.js";

const modulesRoutes = express.Router();

// Route to create a new module
modulesRoutes.post("/", createModule);

// Route to get all modules
modulesRoutes.get("/", getModules);

// Route to get a module by ID
modulesRoutes.get("/:id", getModuleById);

// Route to update a module by ID
modulesRoutes.put("/:id", updateModule);

// Route to delete a module by ID
modulesRoutes.delete("/:id", deleteModule);

export default modulesRoutes;
