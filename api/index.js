import express, { json } from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/dbConnect.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/authRoute.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}!!!`);
});

connectToDB();

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server error!!!";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
