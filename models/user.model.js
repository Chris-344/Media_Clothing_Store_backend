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
  },
  { timestamps: true, collection: "user" }
);

userSchema.pre("save", async function (next) {
  const hashedPassword = await hash(this.userPassword, 10);
  this.userPassword = hashedPassword;
  next();
});

export const User = mongoose.model("User", userSchema);
