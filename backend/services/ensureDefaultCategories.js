import { defaultCategories } from "../config/defaultCategories.js";
import category from "../models/category.model.js";

export const ensureDefaultCategories = async (userId) => {
  const count = await category.countDocuments({ user: userId });

  if (count === 0) {
    const categories = defaultCategories.map((category) => ({
      ...cat,
      user: userId,
      isDefault: true,
    }));

    await category.insertMany(categories);
  }
};
