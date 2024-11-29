import { connect } from "mongoose";
import { app } from "./app.js";
import { connectDB } from "./db/db.js";
const port =3000
try {
    connectDB()
    app.listen(port,()=>{
        console.log(`server running at port :${port}`);
    })
} catch (error) {
    console.error("error",error);
}
