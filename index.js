
import { app } from "./app.js";
import { connectDB } from "./db/db.js";
const port =3000

    connectDB().then(()=>{
        app.listen(port,()=>{
            console.log(`server running at port :${port}`);
        })
    }).catch((error)=>{
        console.error("invalid db connection ",error);
    })
