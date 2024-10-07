import("dotenv/config");
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectToDB } from "./src/config/dbConnection.js";
import { corsOpts } from "./src/constants/options.js";
import globalErrorHandler from "./src/middlewares/errHandler.js";
import authRouter from "./src/routes/auth.routes.js";
import financeRouter from "./src/routes/finances.routes.js";

const app = express();
const port = process.env.PORT || 6060;

app.use(cors(corsOpts));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/finances", financeRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Expense Tracker API!");
});

app.use(globalErrorHandler);

app.listen(port, () => {
  connectToDB();
  console.log(
    `Server is running on port ${port} in ${process.env.NODE_ENV} mode`
  );
});
