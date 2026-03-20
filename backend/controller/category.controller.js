import asyncHandler from "../middlewares/asyncHandler.js";
import category from "../models/category.model.js";
import { ensureDefaultCategories } from "../services/ensureDefaultCategories.js";

export const getCategories = asyncHandler(async (req, res) => {
  await ensureDefaultCategories(req.userId);

  const categories = await category.find({ user: req.userId });

  res.status(200).json(categories);
});

export const addCategory = asyncHandler(async (req, res) => {
  const { name, type, icon } = req.body;

  const newCategory = await category.create({
    name,
    type,
    icon,
    user: req.userId,
  });

  res.status(200).json(newCategory);
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const categoryToDelete = await category.findOne({
    _id: id,
    user: req.userId,
  });

  if (!categoryToDelete) {
    return res.status(404).json({ message: "Category not found" });
  }
  await category.findByIdAndDelete(id);

  res.status(200).json({ message: "Category deleted successfully" });
});
