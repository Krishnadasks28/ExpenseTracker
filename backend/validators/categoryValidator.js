import { body } from "express-validator";

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
