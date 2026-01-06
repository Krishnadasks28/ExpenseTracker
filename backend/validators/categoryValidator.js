import { body, validationResult } from "express-validator";

export const createCategoryValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("type").isIn(["income", "expense"]).withMessage("invalid category type"),
  body("icon")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Invalid icon"),
  body("color")
    .optional({ checkFalsy: true })
    .isHexColor()
    .withMessage("invalid color code"),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: errors.array() });
  }

  next();
};
