import express from "express";
import { clearSession, register } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/createUser", register);

authRouter.post("/logout", clearSession);

// create route for checking session

export default authRouter;
