import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    type: {
      type: String,
      enum: ["income", "expense","contra"],
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: false,
    },

    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: false,
    },
    fromAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: false,
    },
    toAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: false,
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
  { timestamps: true },
);

const transaction = mongoose.model("Transaction", transactionSchema);
export default transaction;
