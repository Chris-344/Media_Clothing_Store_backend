import mongoose, { Schema } from "mongoose";

const cartItemSchema = new mongoose.Schema({
    cartProducts: [{
        cardProduct: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        cartQuantity: {
            type: Number,
            default: 0
        }
    }
    ]


}, { timestamps: true })
export const CartItem=mongoose.models("CartItem",cartItemSchema)