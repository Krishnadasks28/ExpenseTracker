import { body, validationResult } from "express-validator";

export const createTransactionValidator = [
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ min: 1 })
    .withMessage("Amount must be a number greater than 0"),

  body("type")
    .notEmpty()
    .withMessage("Transaction type is required")
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid categoryId"),

  body("account")
    .notEmpty()
    .withMessage("account is required")
    .isMongoId()
    .withMessage("Invalid account id"),

  body("description")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("description must be a string"),

  body("date").optional().isISO8601().withMessage("invalid date format"),
];

export const validateTransaction = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: errors.array() });
  }

  next();
};
