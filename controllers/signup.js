import TempUser from "../models/TempUser.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateVerificationCode from "../utils/generateVerificationCode.js";
import codeExpiresAt from "../utils/codeExpiresAt.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

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
    const ExpiresAt = codeExpiresAt();
    TempUser.findOneAndUpdate(
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
    const code = generateVerificationCode();
    await sendVerificationEmail({ to: email }, code);
  } catch (error) {
    console.error("error with signup route", error.message);
    res.status(500).json({ message: "Error with sign up route" });
  }
}
export default signup;
