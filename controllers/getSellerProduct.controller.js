import mongoose from "mongoose";
import connectDB from "../db/db.js";
import { Product } from "../models/product.model.js";

export const getSellerProduct = async (req, res) => {
  const isConnected = mongoose.connection.readyState;

  if (isConnected !== 1) {
    await connectDB();
    res.json({ message: "DB is not connected connecting again" }).status(500);
    return;
  }
  const sellerId = req.req.params.sellerId;
  try {
    const sellerProducts = await Product.find({
      productSeller: sellerId,
    });
    res.json({ sellerProducts }).status(200);
  } catch (error) {
    res.json({ error: "failed to get product" });
  }
};
