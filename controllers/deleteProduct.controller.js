import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import connectDB from "../db/db.js";

export const deleteProduct = async (req, res) => {
  const isConnected = mongoose.connection.readyState;

  if (isConnected !== 1) {
    await connectDB();
    res.json({ message: "DB is not connected connecting again" }).status(500);
    return;
  }
  const { productId } = req.body;
  if (!productId) {
    return res
      .json({ message: "unable found productId:", productId })
      .status(200);
  }
  try {
    const deletedProduct = Product.deleteOne({ _id: productId });
    res.json({ message: `deleted successfully` });
  } catch (error) {
    res.json({ message: "failed to delete product" }).status(400);
  }
};
