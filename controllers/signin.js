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

export default signin;
