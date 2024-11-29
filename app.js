 
import express, { json, urlencoded } from 'express';
 
import cookieParser from 'cookie-parser';
 

const app = express();
 
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
export {app} 
