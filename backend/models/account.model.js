import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      required: false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true },
);

const account = mongoose.model("account", accountSchema);
export default account;
