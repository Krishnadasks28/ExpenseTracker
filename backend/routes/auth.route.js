import express from "express";
import verifyUser from "../middlewares/auth.middleware.js";
import { register } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/verifyUser", verifyUser, register);


export default authRouter
