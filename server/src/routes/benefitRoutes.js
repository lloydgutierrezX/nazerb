import express from "express";
import {
  createBenefit,
  deleteBenefit,
  getBenefites,
  updateBenefit,
} from "../controllers/benefitController.js";

const moduleRoutes = express.Router();

// Route to create a new module
moduleRoutes.post("/", createBenefit);

// Route to get all modules
moduleRoutes.get("/", getBenefites);

// Route to get a module by ID
// moduleRoutes.get("/:id", getModuleById);

// Route to update a module by ID
moduleRoutes.put("/:id", updateBenefit);

// Route to delete a module by ID
moduleRoutes.delete("/:id", deleteBenefit);

export default moduleRoutes;
