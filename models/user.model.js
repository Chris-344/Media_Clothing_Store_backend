import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userAddress: {
        country: String,
        state: String,
        city: String,
        pinCode: Number,
        landmark: String
    },
    userMobileNumber: {
        type: Number,
    },
    cart: {
        type: mongoose.ObjectId,
        ref: 'CartItem'
    }
},{timestamps:true})
export const  User=mongoose.model("User",userSchema)