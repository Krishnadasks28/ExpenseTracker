import express from "express";
import verifyUser from "../middlewares/auth.middleware.js";
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "../controller/transaction.controller.js";

const transactionRouter = express.Router();

transactionRouter.get("/getTransactions", verifyUser, getTransactions);

transactionRouter.post("/addTransaction", verifyUser, addTransaction);

transactionRouter.put("/updateTransaction/:id", verifyUser, updateTransaction);

transactionRouter.delete(
  "/deleteTransaction/:id",
  verifyUser,
  deleteTransaction
);

export default transactionRouter;
