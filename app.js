import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
dotenv.config();
app.use(
  cors({
    origin: [`${process.env.WHITE_LIST_CLIENT}`],
    credentials: true,
  }),
);
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//Routes
import userRouter from "./routes/users.routes.js";
import productsRouter from "./routes/products.routes.js";
import sellerRouter from "./routes/seller.routes.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/seller", sellerRouter);
export { app };
