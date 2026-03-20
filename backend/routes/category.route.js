import express from "express";
import verifyUser from "../middlewares/auth.middleware.js";
import {
  addCategory,
  deleteCategory,
  getCategories,
} from "../controller/category.controller.js";
import { createCategoryValidator } from "../validators/categoryValidator.js";
import { validate } from "../validators/validate.js";

const categoryRoute = express.Router();

categoryRoute.get("/getCategories", verifyUser, getCategories);

categoryRoute.post(
  "/createCategory",
  verifyUser,
  createCategoryValidator,
  validate,
  addCategory,
);

categoryRoute.delete("/deleteCategory/:id", verifyUser, deleteCategory);

export default categoryRoute;
