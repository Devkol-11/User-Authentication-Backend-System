import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { accessToken, refreshToken } from "../utils/token.js";

async function signin(req, res) {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({
        message: "Username not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    const access_Token = accessToken({ id: existingUser._id });
    const refresh_Token = refreshToken({ id: existingUser._id });

    res.cookie("token", access_Token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.cookie("refreshToken", refresh_Token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Successfully logged in",
      user: {
        id: existingUser._id,
        username: existingUser.username,
      },
    });
  } catch (error) {
    console.error("Error with login route:", error.message);
    res.status(500).json({
      message: "Error signing in",
    });
  }
}

export default signin;
