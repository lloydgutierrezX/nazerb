import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const userRoutes = express.Router();

// Route to create a new user
userRoutes.post("/", createUser);

// Route to get all users
userRoutes.get("/", getUsers);

// Route to update a user by ID
userRoutes.put("/:id", updateUser);

// Route to delete a user by ID
userRoutes.delete("/:id", deleteUser);

userRoutes.put("/retrieve/:id", updateUser);

export default userRoutes;
