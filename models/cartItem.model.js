import mongoose, { Schema } from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    userCart: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    cartProducts: [
      {
        cardProduct: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        cartQuantity: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true },
  { collection: "cartItem" },
);
export const CartItem = mongoose.models("CartItem", cartItemSchema);
