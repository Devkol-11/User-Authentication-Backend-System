function signout(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Logged out successfullly",
    });
  } catch (error) {
    console.error("error with signout route", error.message);
    res.status(500).json({
      message: "Error Signing Out",
    });
  }
}
export default signout;
