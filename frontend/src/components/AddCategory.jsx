import { X } from "lucide-react";
import CustomSelect from "./ui/CustomSelect";
import { useEffect, useState } from "react";
import IconPicker from "./ui/IconPicker";
import { createCategory, updateCategory as updateCategoryApi } from "../api/categories.api";
import { setCategory } from "../redux/slices/categorySlice";
import { useDispatch } from "react-redux";
import { categoryQuery, getData } from "../api/queries";
import toast from "react-hot-toast";

const AddCategory = ({ showModel, setShowModel, editingCategory = null }) => {
  const categoryTypes = ["income", "expense", "contra"];
  const [errors, setErrors] = useState({ name: "", type: "", icon: "" });
  const dispatch = useDispatch();

  const [categoryData, setCategoryData] = useState({
    name: "",
    type: "",
    icon: "",
  });

  useEffect(() => {
    if (showModel) {
      if (editingCategory) {
        setCategoryData({
          name: editingCategory.name || "",
          type: editingCategory.type || "",
          icon: editingCategory.icon || "",
        });
      } else {
        setCategoryData({ name: "", type: "", icon: "" });
      }
      setErrors({ name: "", type: "", icon: "" });
    }
  }, [showModel, editingCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      let res;
      if (editingCategory) {
        res = await updateCategoryApi(editingCategory._id, categoryData);
      } else {
        res = await createCategory(categoryData);
      }

      if (res.ok) {
        toast.success(editingCategory ? "Category updated successfully" : "Category created successfully");
        const response = await getData(categoryQuery);
        if (response.ok) {
          const categoryList = await response.json();
          dispatch(setCategory(categoryList.data.categories));
        }
        setShowModel(false);
      } else {
        toast.error("Failed to save category");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!categoryData.name.trim()) {
      errors.name = "Category name is required";
    }
    if (!categoryData.type) {
      errors.type = "Category type is required";
    }
    if (!categoryData.icon) {
      errors.icon = "Category icon is required";
    }
    return errors;
  };

  return (
    <>
      {showModel && (
        <div
          className={`fixed px-2 inset-0 bg-black/40 w-screen h-screen z-50 flex justify-center items-center text-xl `}
        >
          <div className="bg-white dark:bg-[oklch(0.145_0_0)] p-4 md:p-6 rounded-xl w-full lg:w-1/3 animate-scaleIn">
            <div className="flex justify-between">
              <div>
                <h1 className="font-semibold text-xl md:text-2xl">
                  {editingCategory ? "Edit Category" : "New Category"}
                </h1>
                <p className="text-gray-400 text-sm md:text-[16px]">
                  {editingCategory ? "Update your transaction category" : "Create a new category for your transactions"}
                </p>
              </div>
              <div>
                <X
                  className="cursor-pointer dark:hover:bg-[oklch(0.300_0_0)] hover:bg-slate-200"
                  onClick={() => setShowModel(false)}
                />
              </div>
            </div>

            {/* form */}
            <form className="flex flex-col gap-5 mt-5 text-sm md:text-lg ">
              <div className="flex flex-col gap-1">
                <label htmlFor="categoryName">Title</label>
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name}</p>
                )}
                <input
                  type="text"
                  id="categoryName"
                  name="name"
                  value={categoryData.name}
                  onChange={(e) =>
                    setCategoryData({ ...categoryData, name: e.target.value })
                  }
                  placeholder="e.g. Food, Salary, etc."
                  className="dark:bg-[oklch(0.200_0_0)] rounded-xl bg-slate-100 p-2 focus:outline-0 focus:ring-2 focus:ring-slate-400 border border-transparent dark:text-white"
                />
              </div>

              <div className="flex gap-4 w-full">
                <div className="flex flex-col w-1/2 gap-1">
                  <label htmlFor="expenseType">Type</label>
                  {errors.type && (
                    <p className="text-red-600 text-sm">{errors.type}</p>
                  )}
                  <div>
                    <CustomSelect
                      value={categoryData.type}
                      onChange={(value) =>
                        setCategoryData({ ...categoryData, type: value })
                      }
                      options={categoryTypes}
                      placeholder="Select type"
                    />
                  </div>
                </div>

                <div className="flex flex-col w-1/2 gap-1">
                  <label htmlFor="expenseType">Choose an icon</label>
                  {errors.icon && (
                    <p className="text-red-600 text-sm">{errors.icon}</p>
                  )}
                  <div>
                    <IconPicker
                      value={categoryData.icon}
                      onChange={(value) =>
                        setCategoryData({ ...categoryData, icon: value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 w-full mt-4">
                <button
                  type="button"
                  onClick={() => setShowModel(false)}
                  className="cursor-pointer dark:hover:bg-[oklch(0.200_0_0)] hover:bg-slate-200 border border-slate-300 rounded-xl px-4 py-2 w-1/2"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="cursor-pointer hover:bg-emerald-600 text-white font-bold bg-emerald-500 rounded-xl px-4 py-2 w-1/2"
                >
                  {editingCategory ? "Update Category" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCategory;
