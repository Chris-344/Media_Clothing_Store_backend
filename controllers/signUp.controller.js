import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { connectDB } from "../db/db.js";

export const SignUpUser = async (req, res) => {
    const isConnected = mongoose.connection.readyState;

    if (isConnected !== 1) {
        console.log("DB is not connected, connecting again");
        await connectDB();
    }

    try {
        const { name, email, password, address, mobileNumber } = req.body;
        if (!name || !password || !email || !address || !mobileNumber) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const dbRes = await User.create({
            userName: name,
            userPassword: password,
            userEmail: email,
            userAddress: address,
            userMobileNumber: mobileNumber
        });

        console.log(`User created: ${name}, ${email}, ${address}, ${mobileNumber}`);
        res.status(200).json({ message: "User registered successfully", dbRes });
    } catch (error) {
        res.status(400).json({ message: "Failed to sign up", error });
    }
};
