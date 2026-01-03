import express from "express";
import verifyUser from "../middlewares/auth.middleware";
import { register } from "../controller/auth.controller";


const authRouter = express.Router();

authRouter.post("/verifyUser", verifyUser, register);


export default authRouter
