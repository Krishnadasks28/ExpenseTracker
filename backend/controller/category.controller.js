import asyncHandler from "../middlewares/asyncHandler.js";
import category from "../models/category.model.js";
import { ensureDefaultCategories } from "../services/ensureDefaultCategories.js";

export const getCategories = asyncHandler(async (req, res) => {
  await ensureDefaultCategories(req.userId);

  const categories = await category.find({ user: req.userId });

  res.status(200).json(categories);
});

export const addCategory = asyncHandler(async (req, res) => {
  const { name, type, icon, color } = req.body;

  const newCategory = await category.create({
    name,
    type,
    icon,
    color,
    user: req.userId,
  });

  res.status(200).json(newCategory);
});
