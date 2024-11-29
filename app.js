 
import express, { json, urlencoded } from 'express';
 
import cookieParser from 'cookie-parser';
 
 

const app = express();

 ;


app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

 
// catch 404 and forward to error handler
 
// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
 
 export {app} 
