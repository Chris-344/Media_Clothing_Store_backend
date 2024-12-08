import { hash } from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
    userProfile: {
      type: String,
    },
    addrCountry: String,
    addrState: String,
    addrCity: String,
    addrStreetName:String,
    addrRoad:String,
    addrPinCode: Number,
    addrLandmark: String,
    userMobileNumber: {
      type: String,
      unique: true,
    },
    cart: {
      type: mongoose.ObjectId,
      ref: "CartItem",
    },
    orders: [{ productId: mongoose.ObjectId, quantity: Number, price: Number, date: { type: Date, default: Date.now } }]
  },
  { timestamps: true, collection: "user" }
);

userSchema.pre("save", async function (next) {
  const hashedPassword = await hash(this.userPassword, 10);
  this.userPassword = hashedPassword;
  next();
});

export const User = mongoose.model("User", userSchema);
