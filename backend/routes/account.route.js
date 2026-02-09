import express from "express";
import verifyUser from "../middlewares/auth.middleware";
import { createAccountsValidator } from "../validators/accountsValidator";
import { validate } from "../validators/validate";
import { addNewAccount, getAccounts } from "../controller/accounts.controller";
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
