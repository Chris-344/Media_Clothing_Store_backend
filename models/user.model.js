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
    userAddress: {
      country: String,
      state: String,
      city: String,
      pinCode: Number,
      landmark: String,
    },
    userMobileNumber: {
      type: Number,
      unique: true,
    },
    cart: {
      type: mongoose.ObjectId,
      ref: "CartItem",
    },
  },
  { timestamps: true },
  { collection: "user" },
);

userSchema.pre("save", async function (next) {
  const hashedPassword = await hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

export const User = mongoose.model("User", userSchema);
