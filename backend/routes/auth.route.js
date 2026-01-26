import express from "express";
import verifyUser from "../middlewares/auth.middleware.js";
import { register } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/createUser", register);

export default authRouter;
