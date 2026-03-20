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
} from "../validators/transactionValidator.js";
import { validate } from "../validators/validate.js";

const transactionRouter = express.Router();

transactionRouter.post(
  "/addTransaction",
  verifyUser,
  createTransactionValidator,
  validate,
  addTransaction,
);

transactionRouter.put(
  "/updateTransaction/:id",
  verifyUser,
  updateTransactionValidator,
  validate,
  updateTransaction,
);

transactionRouter.delete(
  "/deleteTransaction/:id",
  verifyUser,
  deleteTransaction,
);

export default transactionRouter;
