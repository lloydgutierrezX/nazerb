import express from "express";
import {
  getEmployeeTypes,
  createEmployeeType,
  updateEmployeeType,
  deleteEmployeeType,
} from "../controllers/employeeTypeController.js";

const employeeTypeRoutes = express.Router();

// Route to create a new EmployeeType
employeeTypeRoutes.post("/", createEmployeeType);

// Route to get all EmployeeTypes
employeeTypeRoutes.get("/", getEmployeeTypes);

// Route to get a EmployeeType by ID
employeeTypeRoutes.get("/:id", updateEmployeeType);

// Route to update a EmployeeType by ID
employeeTypeRoutes.put("/:id", updateEmployeeType);

// Route to delete a EmployeeType by ID
employeeTypeRoutes.delete("/:id", deleteEmployeeType);

export default employeeTypeRoutes;
