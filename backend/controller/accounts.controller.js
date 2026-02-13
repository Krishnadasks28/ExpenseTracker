import asyncHandler from "../middlewares/asyncHandler.js";
import account from "../models/account.model.js";

export const addNewAccount = asyncHandler(async (req, res) => {
  console.log("add account request")
  const { name, balance, notes } = req.body;
  const newAccount = await account.create({
    name,
    balance,
    notes,
    user: req.userId,
  });

  res.status(200).json(newAccount);
});

export const getAccounts = asyncHandler(async (req, res) => {
  const accounts = await account.find({ user: req.userId });

  res.status(200).json(accounts);
});
