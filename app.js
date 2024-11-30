import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//Routes
import userRouter from './routes/users.routes.js';
import productsRouter from './routes/products.routes.js'
app.use('/api/v1/user', userRouter);
app.use('/api/v1/products', productsRouter)
export { app } 
