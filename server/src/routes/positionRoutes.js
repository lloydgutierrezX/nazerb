import express from "express";
import {
  getPosition,
  createPosition,
  updatePosition,
  deletePosition,
} from "../controllers/positionController.js";

const moduleRoutes = express.Router();

// Route to create a new module
moduleRoutes.post("/", createPosition);

// Route to get all modules
moduleRoutes.get("/", getPosition);

// Route to get a module by ID
// moduleRoutes.get("/:id", getModuleById);

// Route to update a module by ID
moduleRoutes.put("/:id", updatePosition);

// Route to delete a module by ID
moduleRoutes.delete("/:id", deletePosition);

export default moduleRoutes;
