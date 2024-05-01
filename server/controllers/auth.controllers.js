import bcrypt from "bcryptjs";
import validator from "validator";

import User from "../models/user.model.js";
import { generateToken } from "../lib/generateToken.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    const isUserExists = await User.findOne({ $or: [{ username }, { email }] });
    if (isUserExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    if (!username || !email || !password || !fullName) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    if (newUser) {
      const token = generateToken(newUser._id, res);

      res.status(201).json({
        message: "Account created successfully!",
        token,
        user: newUser,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log(`Error in register: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const isPasswordMatch = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = generateToken(user._id, res);

    res.json({
      message: "Logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(`Error in login: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(`Error in logout: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(`Error in currentUser: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
