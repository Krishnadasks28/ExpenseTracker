import express from "express";
import cors from "cors";
import morgan from "morgan";

import { configDotenv } from "dotenv";
configDotenv();

import connectDB from "./config/db";
import errorHandler from "./middlewares/error.middleware";

const app = express();

//logging
app.use(morgan("dev"));

app.use(express.json);
app.use(express.urlencoded({ extended: true }));
app.use(cors);

app.use(errorHandler);

// connect database
connectDB();
app.listen(8000, () => console.log("server started"));
