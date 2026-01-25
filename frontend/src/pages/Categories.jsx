import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  UtensilsCrossed,
  Home,
  Car,
  ShoppingCart,
  Film,
  Heart,
} from "lucide-react";

export default function Categories() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Food & Dining",
      icon: UtensilsCrossed,
      type: "expense",
      transactions: 24,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      id: 2,
      name: "Housing",
      icon: Home,
      type: "expense",
      transactions: 12,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 3,
      name: "Transportation",
      icon: Car,
      type: "expense",
      transactions: 18,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 4,
      name: "Shopping",
      icon: ShoppingCart,
      type: "expense",
      transactions: 31,
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
    },
    {
      id: 5,
      name: "Entertainment",
      icon: Film,
      type: "expense",
      transactions: 9,
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
    {
      id: 6,
      name: "Health & Fitness",
      icon: Heart,
      type: "expense",
      transactions: 7,
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
  ]);

  const filteredCategories =
    activeFilter === "All"
      ? categories
      : categories.filter((cat) => cat.type === activeFilter.toLowerCase());

  return (
    <div className="min-h-screen px-3 lg:px-10">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Categories
            </h1>
            <p className="text-gray-600">Manage your transaction categories</p>
          </div>
          <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Plus size={20} />
            Add Category
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-8">
          {["All", "Income", "Expense"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeFilter === filter
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                {/* Top Section with Icon and Actions */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`${category.bgColor} rounded-lg p-3 w-fit`}>
                    <IconComponent
                      className={`${category.iconColor} w-6 h-6`}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Edit2 size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Category Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {category.name}
                </h3>

                {/* Category Type and Transaction Count */}
                <div className="flex justify-between items-center">
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                    {category.type}
                  </span>
                  <span className="text-gray-600 text-sm">
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
