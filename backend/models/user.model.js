import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Number,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    authProviders: {
      type: [String],
      enum: ["phone", "google.com"],
      default: [],
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    currency: {
      type: String,
      default: "INR",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const user = mongoose.model("user", userSchema);
export default user;
