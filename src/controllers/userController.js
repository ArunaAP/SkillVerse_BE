import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

// Function to add an Admin
export const addAdmin = async (req, res) => {
  try {
    // Destructure username and password from the request body
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Admin user
    const newAdmin = new User({
      username,
      password: hashedPassword,
      role: "Admin",
    });

    // Save the admin to the database
    await newAdmin.save();

    res.status(201).json({ message: "Admin added successfully", admin: newAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user details
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user. Please try again later." });
  }
};

