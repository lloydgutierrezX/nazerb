import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// Register new user
// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
// @body    { username, email, password }
// @response { token }
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const existingUser = await User.find({ username });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({
    username,
    password: hashedPassword,
  });

  await newUser.save();

  // Generate JWT token
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(201).json({ token });
});
