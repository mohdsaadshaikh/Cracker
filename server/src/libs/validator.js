import { body, validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";
import {
  CATEGORY,
  EXPENSE_TYPE,
  PAYMENT_METHOD,
} from "../constants/financeConstant.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((err) => err.msg)
      .join(", ");

    return next(new ApiError(errorMessages, 400));
  }
  return next();
};

export const registerValidator = () => [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").notEmpty().isEmail().withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export const loginValidator = () => [
  body("email").notEmpty().isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const createFinanceValidator = () => [
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string."),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a positive number."),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(CATEGORY)
    .withMessage("Category must be one of the valid categories."),

  body("paymentMethod")
    .notEmpty()
    .withMessage("Payment Method is required")
    .isIn(PAYMENT_METHOD)
    .withMessage("Payment Method must be one of the valid options."),

  body("type")
    .optional()
    .isIn(EXPENSE_TYPE)
    .withMessage("Type must be either 'EXPENSE' or 'INCOME'."),
];
