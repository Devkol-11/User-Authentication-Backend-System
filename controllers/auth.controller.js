import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function signup(req, res) {
  try {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });
    res.status(201).json({
      message: "success",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("error with signup route", error);
    res.status(500).json({ message: "Error Signing Up" });
  }
}

async function signin(req, res) {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({
        messaage: "Username not found",
      });
    }
    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!comparePassword) {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "successsfully logged in",
      user: {
        username: existingUser.username,
      },
    });
  } catch (error) {
    console.error("error with login route", error.message);
    res.status(500).json({
      message: "Error Signing In",
    });
  }
}

function signout(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Logged out successfullly",
    });
  } catch (error) {
    console.error("error with signout route", error.message);
    res.status(500).json({
      message: "Error Signing Out",
    });
  }
}

export { signup, signin, signout };
