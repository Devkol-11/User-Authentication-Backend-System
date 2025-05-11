import tempUser from "../models/TempUser.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function verifyCode(req, res) {
  try {
    const { email, code } = req.body;
    const tempUserDoc = await tempUser.findOne({ email });
    if (!tempUserDoc) {
      return res.status(400).json({ message: "email not found" });
    }
    if (tempUserDoc.code !== code) {
      return res.status(400).json({ message: "Invalid Code" });
    }
    const newDoc = {
      email: tempUserDoc.email,
      username: tempUserDoc.username,
      password: tempUserDoc.password,
    };
    const newUser = await User.create({ newDoc });
    tempUser.deleteOne({ email });
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
      meessage: "User successfully Created",
    });
  } catch (error) {
    console.error("error creating user", error.meessage);
    res.status(500).json({
      message: "Server Error",
    });
  }
}

export default verifyCode;
