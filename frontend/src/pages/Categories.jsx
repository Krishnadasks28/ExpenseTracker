import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { getCategories } from "../api/categories.api";
import { useSelector } from "react-redux";

export default function Categories() {
  const [activeFilter, setActiveFilter] = useState("All");
  //fetch categories from redux store
  const categories = useSelector((state) => state.category);
  const filteredCategories =
    activeFilter === "All"
      ? categories
      : categories.filter((cat) => cat.type === activeFilter.toLowerCase());

  return (
    <div className="min-h-screen px-3 lg:px-10">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl sm:text-4xl font-semibold">Categories</h1>
            <p className="text-xs sm:text-lg text-slate-500 dark:text-slate-400">
              Manage your transaction categories
            </p>
          </div>
          <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs lg:text-lg px-2 lg:px-4 py-2 rounded-lg font-medium transition-colors">
            <Plus size={18} className="h-5 w-5 hidden sm:inline" />
            Add Category
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3">
          {["All", "Income", "Expense"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`cursor-pointer px-2 lg:px-4 py-1 lg:py-2 rounded-lg text-sm lg:text-lg font-medium transition-colors ${
                activeFilter === filter
                  ? "bg-emerald-500 text-white"
                  : "dark:bg-black dark:hover:bg-white dark:text-white dark:hover:text-black bg-white  text-gray-700 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-2.5 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            return (
              <div
                key={category._id}
                className="rounded-xl border-2 border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                {/* Top Section with Icon and Actions */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`${category.bgColor} rounded-lg p-3 w-fit`}>
                    <span className={`${category.iconColor} w-6 h-6`}>
                      {category.icon}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 dark:hover:text-white hover:text-gray-600 transition-colors">
                      <Edit2 size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Category Name */}
                <h3 className="text-xl font-bold mb-3">{category.name}</h3>

                {/* Category Type and Transaction Count */}
                <div className="flex justify-between items-center">
                  <span
                    className={` ${category.type === "income" ? "text-emerald-500 bg-emerald-100" : "text-red-700 bg-red-100"} px-3 py-1 rounded-full text-sm font-medium`}
                  >
                    {category.type}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {category.transactions} transactions
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
