import { compare } from "bcrypt";

import jwt from 'jsonwebtoken'
import mongoose from "mongoose";
import connectDB  from "../db/db.js";
import { User } from "../models/user.model.js";

export const Login = async (req, res) =>
{
    const isConnected = mongoose.connection.readyState;

    if (isConnected !== 1)
    {
        await connectDB();
        console.log("DB is not connected connecting again");
        return;
    }
    const { email, password } = req.body;
    const payload = { email:email, password:  password };
    console.log({ "email": email, "password": password })
    if (email && password)
    {
        try
        {
            const user = await User.find({ email: email })
            console.log("result", user[0])
            const savedPassword = user[0].password;
            console.log("password", user[0].password)
            if(!user)return res.status(400).json({message:"user not found"});
            const isValid=compare(password,savedPassword);
            if(!isValid)return res.status(400).json({message:"Invalid credentials"})
            const accessToken=jwt.sign({id:user[0]._id},process.env.JWT_SECRET,{expiresIn:"30min"});
            const refreshToken = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"7d"});
            res.json({accessToken,refreshToken});
        } catch (error)
        {
            res.status(400).json({error:error.message})
        }

    }
}