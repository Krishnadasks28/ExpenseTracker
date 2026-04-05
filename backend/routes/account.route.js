import express from "express";
import verifyUser from "../middlewares/auth.middleware.js";
import { createAccountsValidator } from "../validators/accountsValidator.js";
import { validate } from "../validators/validate.js";
import {
  addNewAccount,
  getAccounts,
  updateAccount,
  deleteAccount,
} from "../controller/accounts.controller.js";
const accountRoute = express.Router();

// add new account
accountRoute.post(
  "/addNewAccount",
  verifyUser,
  createAccountsValidator,
  validate,
  addNewAccount,
);

accountRoute.get("/allAccounts", verifyUser, getAccounts);

// update account
accountRoute.put("/:id", verifyUser, updateAccount);

// Delete account
accountRoute.delete("/:id", verifyUser, deleteAccount);

export default accountRoute;
