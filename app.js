import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errormiddleware } from "./middleware/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

//this middleware use for req.body access
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//using routes here
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, resp) => {
  resp.send("hello world");
});

//error middleware
app.use(errormiddleware);
