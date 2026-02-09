import { body } from "express-validator";

export const createAccountsValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("balance")
    .notEmpty()
    .withMessage("Balance is required")
    .isFloat({ min: 1 })
    .withMessage("Balance must be a number greater than 0"),
];
