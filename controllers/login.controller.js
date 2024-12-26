import  bcrypt from "bcrypt";
import mongoose from "mongoose";
import connectDB from "../db/db.js";
import { User } from "../models/user.model.js";


export const Login = async (req, res) => {
    const isConnected = mongoose.connection.readyState;

    if (isConnected !== 1) {
        await connectDB();
        console.log("DB is not connected, connecting again");
    }

    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    console.log(email, password);
// const hashPassword=await bcrypt.hash(password,10 )
// console.log(hashPassword);
    try {
        // Find user by email
        const user = await User.findOne({ email:email });
        // const user = await User.findOne({_id:'6756e5476ef82984aa55702c' });
        
        console.log("result ", user);
        // console.log("result1 ", user1);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const savedPassword = user.password;
        console.log("password", password);
        console.log("saved password", savedPassword);

        const isValid = await   bcrypt.compare(password,savedPassword);
        console.log("is valid", isValid);

// if (hashPassword !==savedPassword) {
//             console.log("hashPassword !==savedPassword",hashPassword !==savedPassword);
//         }
        // if (hashPassword !==savedPassword) {
        //     return res.status(400).json({ message: "Invalid credentials" });
        // }

        // if (!isValid) {
        //     return res.status(400).json({ message: "Invalid credentials" });
        // }
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "success", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// if (isValid) {
//   const accessToken = jwt.sign(
//     { id: user[0]._id },
//     process.env.JWT_SECRET,
//     { expiresIn: "30min" },
//   );
//   const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
//   res.json({
//     accessToken,
//     refreshToken,
//     message: "login is successfully",
//   });
//   res.cookie("accessToken", accessToken, { maxAge: 60000 });
//   res.cookie("refreshToken", refreshToken, {
//     maxAge: 300000,
//     httpOnly: true,
//     secure: true,
//     sameSite: "strict",
//   });
// }