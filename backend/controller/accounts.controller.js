import asyncHandler from "../middlewares/asyncHandler.js";
import account from "../models/account.model.js";
import transaction from "../models/transaction.model.js";

export const addNewAccount = asyncHandler(async (req, res) => {
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

export const updateAccount = asyncHandler(async (req, res) => {
  const { name, notes } = req.body;
  const updatedAccount = await account.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { name, notes },
    { new: true, runValidators: true }
  );

  if (!updatedAccount) {
    return res.status(404).json({ message: "Account not found" });
  }

  res.status(200).json(updatedAccount);
});

export const deleteAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if any transactions are related to this account
  const transactionsCount = await transaction.countDocuments({
    $or: [{ account: id }, { fromAccount: id }, { toAccount: id }],
  });

  if (transactionsCount > 0) {
    return res.status(400).json({
      message: "The account could not be deleted because of the transactions.",
    });
  }

  const deletedAccount = await account.findOneAndDelete({
    _id: id,
    user: req.userId,
  });

  if (!deletedAccount) {
    return res.status(404).json({ message: "Account not found" });
  }

  res.status(200).json({ message: "Account deleted successfully" });
});
