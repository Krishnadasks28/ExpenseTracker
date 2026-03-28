import React, { useState } from "react";
import { User, Mail, Phone, Camera, LogOut, AlertTriangle } from "lucide-react";
import { logoutUser } from "../api/auth.api";
import { useSelector } from "react-redux";

export default function Settings() {
  // fetch user data from redux
  const userData = useSelector((state) => state.user.user);
  console.log(userData);
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone_number ? userData.phone_number : null,
    avatar: userData.avatar,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // TODO: Send to backend API
    // const response = await fetch('/api/profile', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
    setIsEditing(false);
    alert("Changes saved successfully!");
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.",
    );
    if (confirmed) {
      // TODO: Send delete request to backend
      alert("Account deleted successfully");
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    alert("Logged out successfully");
    // TODO: Clear session and redirect to login
  };

  return (
    <div className="px-2.5 lg:px-10 min-h-screen w-full">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-semibold">
            Profile & Settings
          </h1>
          <p className="text-xs sm:text-lg text-slate-500 dark:text-slate-400">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Information Section */}
        <div className="rounded-2xl border border-gray-200 p-4 lg:p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-2xl mb-2">Profile Information</h2>
            <p className="text-xs sm:text-lg text-slate-500 dark:text-slate-400">
              Update your personal details
            </p>
          </div>

          {/* Profile Avatar and Basic Info */}
          <div className="flex items-center gap-6 pb-8 border-b border-gray-200 mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center">
                <img src={formData.avatar} className=" rounded-full" />
              </div>
              <button className="absolute bottom-0 right-0 bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-full transition-colors">
                <Camera size={16} />
              </button>
            </div>
            <div>
              <h3 className="text-2xl font-bold">{formData.name}</h3>
              <p className="text-slate-600 dark:text-slate-400">
                {formData.email}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-3" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-2 border border-slate-100 rounded-lg disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-2 border border-slate-100 rounded-lg disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Phone Number */}
              {formData.phone && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-3" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2 border border-slate-100 rounded-lg disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSaveChanges}
                  className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* Danger Zone Section */}
        <div className="rounded-2xl border-2 border-red-300 lg:p-8 p-4">
          <div className="lg:mb-8 mb-2">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="text-red-500" size={24} />
              <h2 className="text-2xl font-bold text-red-600">Danger Zone</h2>
            </div>
            <p className="">Irreversible actions</p>
          </div>

          <div className="space-y-6">
            {/* Delete Account */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-medium hidden lg:inline">
                  Delete Account
                </h3>
                <p className="text-sm lg:text-[16px]">
                  Permanently delete your account and all data
                </p>
              </div>
              <div>
                <button
                  onClick={handleDeleteAccount}
                  className="mt-3 text-sm lg:text-lg px-3 lg:px-6 py-2 cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                  Delete Account
                </button>
              </div>
            </div>

            {/* Logout */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <LogOut className="" size={20} />
                <div>
                  <h3 className="text-lg font-medium">Logout</h3>
                  <p className="">Sign out of your account</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-2 border rounded-xl cursor-pointer font-medium hover:text-emerald-600 transition-colors whitespace-nowrap"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
