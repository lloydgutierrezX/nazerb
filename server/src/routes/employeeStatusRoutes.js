import express from "express";
import {
  createModule,
  getModules,
  // getModuleById,
  updateModule,
  deleteModule,
} from "../controllers/modulesController.js";

const moduleRoutes = express.Router();

// Route to create a new module
moduleRoutes.post("/", createModule);

// Route to get all modules
moduleRoutes.get("/", getModules);

// Route to get a module by ID
// moduleRoutes.get("/:id", getModuleById);

// Route to update a module by ID
moduleRoutes.put("/:id", updateModule);

// Route to delete a module by ID
moduleRoutes.delete("/:id", deleteModule);

export default moduleRoutes;
