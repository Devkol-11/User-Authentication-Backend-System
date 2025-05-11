import express from "express";
import validationHandler from "../middlewares/validationHandler.js";
import signupValidation from "../validation/signUp.js";
import signin from "../controllers/signin.js";
import signup from "../controllers/signup.js";
import signout from "../controllers/signout.js";
import verifyCode from "../controllers/verifyCode.js";

const router = express.Router();
router.post("/signin", signin);
router.post("/signUp", signupValidation, validationHandler, signup);
router.get("/signout", signout);
router.post("/verify", verifyCode);

export default router;
