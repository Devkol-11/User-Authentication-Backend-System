// import User from "../models/user.model.js";

function signup(req, res) {
  try {
    res.send("signup route hit");
  } catch (error) {
    console.error("error with signup route", error.message);
  }
}

function login(req, res) {
  try {
    res.send("login route hit");
  } catch (error) {
    console.error("error with login route", error.message);
  }
}

function signout(req, res) {
  try {
    res.send("signout route hit");
  } catch (error) {
    console.error("error with signout route", error.message);
  }
}

export { login, signup, signout };
