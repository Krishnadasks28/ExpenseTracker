import express from "express";
import verifyUser from "../middlewares/auth.middleware.js";
import {
  addCategory,
  getCategories,
} from "../controller/category.controller.js";
import {
  createCategoryValidator,
  validate,
} from "../validators/categoryValidator.js";

const categoryRoute = express.Router();

categoryRoute.get("/getCategories", verifyUser, getCategories);

categoryRoute.post(
  "/addCategory",
  verifyUser,
  createCategoryValidator,
  validate,
  addCategory
);

export default categoryRoute;
