import express from "express";
import {
  getEmployeeTypees,
  createEmployeeType,
  updateEmployeeType,
  deleteEmployeeType,
} from "../controllers/employeeTypeController.js";

const moduleRoutes = express.Router();

// Route to create a new module
moduleRoutes.post("/", createEmployeeType);

// Route to get all modules
moduleRoutes.get("/", getEmployeeTypees);

// Route to get a module by ID
// moduleRoutes.get("/:id", getModuleById);

// Route to update a module by ID
moduleRoutes.put("/:id", updateEmployeeType);

// Route to delete a module by ID
moduleRoutes.delete("/:id", deleteEmployeeType);

export default moduleRoutes;
