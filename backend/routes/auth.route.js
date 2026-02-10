import express from "express";
import {
  checkSessionUser,
  clearSession,
  register,
} from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/createUser", register);

authRouter.post("/logout", clearSession);

// checking session
authRouter.get("/checkSessionUser", checkSessionUser);

export default authRouter;
