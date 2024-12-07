import mongoose from "mongoose";
import connectDB from "../db/db";
import { User } from "../models/user.model";
import { createBillPDF } from "../util/billgenerater";


export const placeOrder = async (req, res) =>
{
    const isConnected = mongoose.connection.readyState;
    if (isConnected !== 1)
    {
        console.log("DB is not connected, connecting again");
        await connectDB();
    }

    try
    {
        const {
            userId,
            cartItems,
            itemsPrice,
            shippingPrice,
            taxPrice,
            shippingAddress,
            paymentMethod,
            totalPrice
        } = req.body;

        const user = await User.findById(userId);
        if (!user)
        {
            return res.status(404).json({ message: "User not found" });
        }

        const order = {
            cartItems,
            itemsPrice,
            shippingPrice,
            taxPrice,
            shippingAddress,
            paymentMethod,
            totalPrice,
            date: new Date()
        };

        user.orders.push(order);
        await user.save();

        createBillPDF(order, user);

        res.status(200).json({ message: "Order placed successfully", user });
    } catch (error)
    {
        console.error("Error placing order:", error);
        res.status(400).json({ message: "Failed to place order", error });
    }
};
