// signupValidation.js
import { body } from "express-validator";

const signupValidation = [
  // Email validation: not empty and must be a valid email
  body("email")
    .notEmpty()
    .withMessage("Email is required") // Check if email is not empty
    .bail() // If email is not empty, proceed to the next validation
    .isEmail()
    .withMessage("Enter a valid email"), // Check if email is valid

  // Password validation: not empty and must have a minimum length of 6 characters
  body("password")
    .notEmpty()
    .withMessage("Password is required") // Check if password is not empty
    .bail() // If password is not empty, proceed to the next validation
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"), // Check password length

  // Name validation: not empty
  body("name").notEmpty().withMessage("Name is required"), // Check if name is not empty
];

export default signupValidation;
