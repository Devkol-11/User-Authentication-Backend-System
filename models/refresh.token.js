import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  userAgent: String, // e.g. Chrome, Firefox
  ip: String, // device IP
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "7d", // auto-delete after 7 days
  },
});

export default mongoose.model("RefreshToken", refreshTokenSchema);
