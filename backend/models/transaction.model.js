import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },

    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    date: {
      type: Date,
      default: Date.now(),
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const transaction = mongoose.model("Transaction", transactionSchema);
export default transaction;
