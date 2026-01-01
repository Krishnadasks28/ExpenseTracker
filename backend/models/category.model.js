import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["income,expense"],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    icon: String,
    color: String,
  },
  { timestamps: true }
);

const category = mongoose.model("category", categorySchema);
export default category;
