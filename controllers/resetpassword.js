import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
async function resetPassword(req, res) {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not Found" });
    }
    if (oldPassword === newPassword) {
      return res
        .status(400)
        .json({ message: "Old password must not be same as new password" });
    }
    const comparePassword = await bcrypt.compare(
      oldPassword,
      existingUser.password
    );
    if (!comparePassword) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashNewPassword = await bcrypt.hash(newPassword, salt);
    existingUser.password = hashNewPassword;
    existingUser
      .save()
      .status(200)
      .json({ message: "Password Updated Successfully" });
  } catch (error) {
    console.error("Server Error : ", error.message);
    res.status(500).json({ message: "Password not Updated Successfully" });
  }
}

export default resetPassword;
