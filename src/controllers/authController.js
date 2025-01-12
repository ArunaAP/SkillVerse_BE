import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";
import dotenv from 'dotenv';

dotenv.config();

// Register User
export const register = async (req, res) => {
  try {
    const { fullname, username, password, role, email, job, region, profileImage } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists." });
    }

    // Hash the password
    const hashedPwd = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullname,
      username,
      password: hashedPwd,
      role,
      email,
      job: job || "", // Optional
      region: region || "", // Optional
      profileImage: profileImage || "https://cdn-icons-png.flaticon.com/512/8847/8847419.png", // Optional
    });

    await newUser.save();

    res.status(201).json({ message: `User registered with username ${username}` });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong in register.", error: err.message });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: `User with username: ${username} not found!` });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, fullname: user.fullname, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ 
      token, 
      user: { 
        id: user._id, 
        fullname: user.fullname,
        username: user.username, 
        role: user.role, 
        email: user.email,
        job: user.job,
        region: user.region,
        profileImage: user.profileImage
      } 
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong in login.", error: err.message });
  }
};
