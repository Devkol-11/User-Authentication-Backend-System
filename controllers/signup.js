import TempUser from "../models/TempUser.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateVerificationCode from "../utils/generateVerificationCode.js";
import codeExpiresAt from "../utils/codeExpiresAt.js";
import sendVerificationEmail from "../utils/sendEmail.js";

async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "username already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const code = generateVerificationCode();
    const ExpiresAt = codeExpiresAt();

    await TempUser.findOneAndUpdate(
      { email },
      {
        email,
        username,
        password: hashedPassword,
        code,
        codeExpiresAt: ExpiresAt,
      },
      { upsert: true, new: true }
    );

    await sendVerificationEmail({ to: email }, code);

    res
      .status(200)
      .json({ message: "Signup initiated. Please verify your email." });
  } catch (error) {
    console.error("Error in signup route:", error.message);
    if (!res.headersSent) {
      res
        .status(500)
        .json({ message: `Error with sign up route : ${error.message}` });
    }
  }
}

export default signup;
