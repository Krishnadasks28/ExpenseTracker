import express from "express";
import verifyUser from "../middlewares/auth.middleware.js";
import { createAccountsValidator } from "../validators/accountsValidator.js";
import { validate } from "../validators/validate.js";
import {
  addNewAccount,
  getAccounts,
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

// Delete account

export default accountRoute;
