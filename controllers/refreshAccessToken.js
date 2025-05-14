import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken.js";
import User from "../models/User.js";
import { refreshToken } from "../utils/token.js";

export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  const storedToken = await RefreshToken.findOne({ token: refreshToken });

  if (!storedToken) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(payload.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAccessToken = refreshToken({ id: user._id });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
};

export default refreshAccessToken;
