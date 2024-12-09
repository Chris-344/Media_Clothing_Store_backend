import { compare } from "bcrypt";
import mongoose from "mongoose";
import connectDB from "../db/db.js";
import { User } from "../models/user.model.js";

export const Login = async (req, res) =>
{
  const isConnected = mongoose.connection.readyState;

  if (isConnected !== 1)
  {
    await connectDB();
    console.log("DB is not connected, connecting again");
  }

  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password)
  {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try
  {
    console.log(email, password);
    const user = await User.findOne({ email: email });
    console.log("result ", user);

    if (!user)
    {
      return res.status(400).json({ message: "User not found" });
    }

    const savedPassword = user.password;
    console.log("password", savedPassword);

    const isValid = await compare(password, savedPassword);
    console.log("is valid", isValid);

    if (!isValid)
    {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error)
  {
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