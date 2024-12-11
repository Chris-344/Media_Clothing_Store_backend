import mongoose from "mongoose";
import connectDB from "../db/db.js";
import { User } from "../models/user.model.js";
import { createBillPDF } from "../util/billGenerate.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// import pdf from '../public/bills'
export const placeOrder = async (req, res) =>
{
    try
    {
        // Check DB connection
        const isConnected = mongoose.connection.readyState;
        if (isConnected !== 1)
        {
            console.log("DB is not connected, connecting again");
            await connectDB();
        }

        const {
            userId,
            cartItems,
            itemsPrice,
            shippingPrice,
            taxPrice,
            paymentMethod,
            totalPrice,
        } = req.body;

        // Validate required fields
        if (
            !userId ||
            !cartItems ||
            !itemsPrice ||
            !shippingPrice ||
            !taxPrice ||
            !paymentMethod ||
            !totalPrice
        )
        {
            return res.status(400).json({
                message: "Missing required fields",
            });
        }

        // Find user and handle if not found
        const user = await User.findById(userId);
        if (!user)
        {
            return res.status(404).json({ message: "User not found" });
        }

        // Create orders from cart items
        const orders = cartItems.map((item) => ({
            productId: item._id || '6752f71837e10eb77265d68f',
            quantity: item.quantity || 1,
            itemsPrice,
            shippingPrice,
            taxPrice,
            paymentMethod,
            totalPrice,
            orderDate: new Date(),
        }));

        // Add orders to user's orders array
        if (!Array.isArray(user.orders))
        {
            user.orders = []; // Initialize if undefined
        }
        user.orders.push(...orders);

        // Create order object for PDF
        const orderForPDF = {
            cartItems,
            itemsPrice,
            shippingPrice,
            taxPrice,
            paymentMethod,
            totalPrice,
            date: new Date(),
        };

        // Save user
        await user.save();

    
        createBillPDF(orderForPDF, user);
        res.json({message:"success"}).status(200)
    } catch (error)
    {
        console.error("Error placing order:", error);
        res.status(500).json({
            message: "Failed to place order",
            error: error.message,
        });
    }
};