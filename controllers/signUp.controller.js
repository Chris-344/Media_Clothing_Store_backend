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
    const { name, email, password, mobileNumber } = req.body;
    console.log(name, email, password, mobileNumber);
    const profileLocalPath = req.files?.profileImage[0]?.path;
    if (!name || !email || !password || !mobileNumber) {
      return res.status(400).json({ error: "All fields are required" });
    }
    console.log(name, email, password, mobileNumber,profileLocalPath);

    if (profileLocalPath) {
      const profile = await uploadOnCloudinary(profileLocalPath);
      const dbRes = await User.create({
        userName: name.toLowerCase(),
        userPassword: password,
        userEmail: email,
        userMobileNumber: mobileNumber,
        userProfile: profile.url,
      });
      res.status(200).json({ message: "User registered successfully", dbRes });
    } else {
      console.log(User);
      const dbRes = await User.create({
        userName: name.toLowerCase(),
        userPassword: password,
        userEmail: email.toLowerCase(),
        userMobileNumber: mobileNumber,
      });
      console.log(dbRes);

      
      res.status(200).json({ message: "User registered successfully", dbRes });
    }
  } catch (error) {
    res.status(400).json({ message: "Failed to sign up", error });
  }
};

export const add_address = async (req, res) => {
  const isConnected = mongoose.connection.readyState;
  if (isConnected !== 1) {
    console.log("DB is not connected, connecting again");
    await connectDB();
  }

  try {
    const { userId, country, state, city, streetName, landMark, pinCode, roadName } = req.body;
    const updateResult = await User.updateOne(
      { _id: userId },
      {
        addrCountry: country,
        addrState: state,
        addrCity: city,
        addrStreetName: streetName,
        addrPinCode: pinCode,
        addrLandmark: landMark,
        addrRoad: roadName,
      }
    );
    res.status(200).json({ message: "Address added successfully", updateResult });
  } catch (error) {
    res.status(400).json({ message: "Failed to add address", error });
  }
};
