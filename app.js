import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
dotenv.config();
// app.use(
//   cors({
//     origin: [`${process.env.WHITE_LIST_CLIENT}`],
//     credentials: true,
//   }),
// );
app.use(cors())
// app.use(json());
// app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' })); // Increase limit to 50MB
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
//Routes
import userRouter from "./routes/users.routes.js";
import productsRouter from "./routes/products.routes.js";
import sellerRouter from "./routes/seller.routes.js";
// import { User } from "./models/user.model.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/seller", sellerRouter);


// for test 
// app.get('/',(req,res)=>{
// const user =User.find()
// console.log(user);
// res.json(user)
// })
export { app };
