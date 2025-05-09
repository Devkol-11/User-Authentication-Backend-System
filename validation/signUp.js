import { check } from "express-validator";

const signupValidator = [
  check("username")
    .notEmpty()
    .withMessage("Username is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Enter a valid email"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .bail()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password must include uppercase, lowercase, number, and special character"
    )
    .custom((value, { req }) => {
      if (value === req.body.username) {
        throw new Error("Username and password cannot be the same");
      }
      return true;
    }),
];

export default signupValidator;
