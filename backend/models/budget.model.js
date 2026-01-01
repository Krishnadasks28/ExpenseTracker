import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },

    month: {
      type: Number,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const budget = mongoose.model("Budget", budgetSchema);
export default budget;
