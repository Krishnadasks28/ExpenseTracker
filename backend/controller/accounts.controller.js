import asyncHandler from "../middlewares/asyncHandler";
import account from "../models/account.model";

export const addNewAccount = asyncHandler(async (req, res) => {
  const { name, balance } = req.body;
  const newAccount = await account.create({ name, balance, user: req.userId });

  res.status(200).json(newAccount);
});

export const getAccounts = asyncHandler(async (req, res) => {
  const accounts = await account.find({ user: req.userId });

  res.status(200).json(accounts);
});
