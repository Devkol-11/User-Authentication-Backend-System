import express from "express";
import validationHandler from "../middlewares/validationHandler.js";
import signupValidation from "../validation/signUp.js";

import { signout, signin, signup } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signin", signin);
router.post("/signUp", signupValidation, validationHandler, signup);
router.get("/signout", signout);

export default router;
