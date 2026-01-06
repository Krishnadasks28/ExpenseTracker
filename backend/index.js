import express from "express";
import cors from "cors";
import morgan from "morgan";

import { configDotenv } from "dotenv";
configDotenv();

import connectDB from "./config/db.js";
import errorHandler from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import transactionRouter from "./routes/transaction.route.js";
import categoryRoute from "./routes/category.route.js";

const app = express();

//logging
app.use(morgan("dev"));

// these middlewares should be before routes
app.use(
  cors({
    origin: "http://localhost:5137",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/auth", authRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/category", categoryRoute);

app.use(errorHandler);

// connect database
connectDB();
app.listen(8000, () => console.log("server started"));
