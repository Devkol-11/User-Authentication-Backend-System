import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true, // no two users can have the same username
    minlength: [3, "Username must be at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // must be unique
    lowercase: true, // saves all emails in lowercase
    match: [/.+@.+\..+/, "Please enter a valid email"], // basic email regex
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
  },
  role: {
    type: String,
    enum: ["user", "admin"], // Defining allowed roles
    default: "user", // Default role is 'user'
  },
});

const User = new mongoose.model("User", userSchema);

export default User;
