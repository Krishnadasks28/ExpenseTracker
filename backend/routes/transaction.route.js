import express from "express";
import verifyUser from "../middlewares/auth.middleware.js";
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "../controller/transaction.controller.js";
import {
  createTransactionValidator,
  updateTransactionValidator,
  validateTransaction,
} from "../validators/transactionValidator.js";

const transactionRouter = express.Router();

transactionRouter.get("/getTransactions", verifyUser, getTransactions);

transactionRouter.post(
  "/addTransaction",
  verifyUser,
  createTransactionValidator,
  validateTransaction,
  addTransaction
);

transactionRouter.put(
  "/updateTransaction/:id",
  verifyUser,
  updateTransactionValidator,
  validateTransaction,
  updateTransaction
);

transactionRouter.delete(
  "/deleteTransaction/:id",
  verifyUser,
  deleteTransaction
);

export default transactionRouter;
