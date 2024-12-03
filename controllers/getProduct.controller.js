import mongoose from "mongoose";
import connectDB from "../db/db.js";
import { Product } from "../models/product.model.js";

export const getProduct = async (req, res) => {
  const isConnected = mongoose.connection.readyState;

  if (isConnected !== 1) {
    await connectDB();
    res.json({ message: "DB is not connected connecting again" }).status(500);
    return;
  }
  try {
    const products = await Product.find();
    res.json({ products }).status(200);
  } catch (error) {
    res.json({ error: "failed to get product" });
  }
};
