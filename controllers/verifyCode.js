import tempUser from "../models/TempUser.model.js";
import User from "../models/user.model.js";
import { accessToken, refreshToken } from "../utils/token.js";
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
    const access_Token = accessToken({ id: existingUser._id });
    const refresh_Token = refreshToken({ id: existingUser._id });
    res.cookie("access_token", access_Token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    res.cookie("refresh_token", refresh_Token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(201).json({
      meessage: "User successfully Created",
      user: {
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("error creating user", error.meessage);
    res.status(500).json({
      message: "Server Error",
    });
  }
}

export default verifyCode;
