import express from "express";
import validationHandler from "../middlewares/validationHandler.js";
import signupValidation from "../validation/signUp.js";
import signin from "../controllers/signin.js";
import signup from "../controllers/signup.js";
import signout from "../controllers/signout.js";
import verifyCode from "../controllers/verifyCode.js";
import resetPassword from "../controllers/resetpassword.js";
import refreshAccessToken from "../controllers/refreshAccessToken.js";

const router = express.Router();

router.post("/signin", signupValidation, validationHandler, signin);
router.post("/signUp", signupValidation, validationHandler, signup);
router.get("/signout", signout);
router.post("/verify", verifyCode);
router.post("/resetPassword", resetPassword);
router.post("token", refreshAccessToken);

export default router;
