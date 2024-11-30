import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
app.use(cors())
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//Routes
import userRouter from './routes/users.routes.js';
import productsRouter from './routes/products.routes.js'
import sellerRouter from './routes/seller.routes.js'
app.use('/api/v1/user', userRouter);
app.use('/api/v1/products', productsRouter)
app.use("/api/v1/seller",sellerRouter)
export { app } 
