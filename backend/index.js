import "dotenv/config";

import express from "express";
import cors from "cors";
import morgan from "morgan";

import connectDB from "./config/db.js";
import errorHandler from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import transactionRouter from "./routes/transaction.route.js";
import categoryRoute from "./routes/category.route.js";
import accountRoute from "./routes/account.route.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import verifyUser from "./middlewares/auth.middleware.js";

const app = express();

//logging
app.use(morgan("dev"));

// these middlewares should be before routes
app.use(
  cors({
    origin: "http://localhost:5137",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/auth", authRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/category", categoryRoute);
app.use("/api/account", accountRoute);

app.use(errorHandler);

// graphql server
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  app.use(
    "/graphql",
    verifyUser,
    expressMiddleware(server, {
      context: ({ req }) => ({ userId: req.userId }),
    }),
  );

  const PORT = process.env.PORT || 8000
  // connect database
  connectDB();
  app.listen(PORT, () => console.log("server started"));
}
startServer();
