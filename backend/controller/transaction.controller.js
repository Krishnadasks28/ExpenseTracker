import asyncHandler from "../middlewares/asyncHandler.js";
import transaction from "../models/transaction.model.js";

// list all expenses limit=40
export const getTransactions = asyncHandler(async (req, res) => {
  const { type, page } = req.query;
  const filter = {
    user: req.userId,
  };
  if (type) {
    filter.type = type;
  }
  const allExpenses = await transaction
    .find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * 20)
    .limit(40);

  res.status(200).json(allExpenses);
});

// add a transaction
export const addTransaction = asyncHandler(async (req, res) => {
  const expense = await transaction.create({
    ...req.body,
    user: req.userId,
  });

  res.status(200).json(expense);
});

// delete transaction
export const deleteTransaction = asyncHandler(async (req, res) => {
  const deletedTransaction = await transaction.findByIdAndDelete(req.params.id);
  if (!deletedTransaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  res.status(200).json({ message: "expense removed" });
});

// update an expense transaction
export const updateTransaction = asyncHandler(async (req, res) => {
  const updatedTransaction = await transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedTransaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  res.status(200).json(updatedTransaction);
});
