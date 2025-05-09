// validationHandler.js
import { validationResult } from "express-validator";

const validationHandler = (req, res, next) => {
  // Get validation errors from request
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // If there are validation errors, send the first error message
    const firstError = errors.array()[0]; // Get the first error from the array
    return res.status(400).json({
      success: false,
      message: firstError.msg, // Send the error message for the first failed validation
    });
  }

  next(); // If no errors, pass control to the next middleware (controller)
};

export default validationHandler;
