import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import connectDB from "../db/db.js";
import { uploadOnCloudinary } from "../util/cloudinary.js";

export const SignUpUser = async (req, res) => {
  const isConnected = mongoose.connection.readyState;

  if (isConnected !== 1) {
    console.log("DB is not connected, connecting again");
    await connectDB();
  }
  try {
    const { name, email, password, address, mobileNumber } = req.body;
    const profileLocalPath = req.files?.profileImage[0]?.path;
    if (!name || !password || !email || !address || !mobileNumber) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (profileLocalPath) {
      const profile = await uploadOnCloudinary(profileLocalPath);
      const dbRes = await User.create({
        userName: name.toLoweCase(),
        userPassword: password,
        userEmail: email,
        userAddress: address.toLowerCase(),
        userMobileNumber: mobileNumber,
        userProfile: profile.url,
      });
      res.status(200).json({ message: "User registered successfully", dbRes });
    } else {
      const dbRes = await User.create({
        userName: name.toLoweCase(),
        userPassword: password,
        userEmail: email,
        userAddress: address.toLowerCase(),
        userMobileNumber: mobileNumber,
      });
      res.status(200).json({ message: "User registered successfully", dbRes });
    }
  } catch (error) {
    res.status(400).json({ message: "Failed to sign up", error });
  }
};
