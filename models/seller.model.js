import mongoose, { Collection } from "mongoose";

const sellerSchema = new mongoose.Schema({
    sellerName: {
        type: String,
        required: true
    },
    sellerPAN_No: {
        type: String,
        required: ['A-Z']
    },
    sellerProductStock: {
        type: Number,
        default: 0
    },
    sellerAddress: {
        country: String,
        city: String,
        pinCode: Number,
        streetName: String,
        roadName: String,
        landMark: String
    },
    sellerProduct: {
        type: mongoose.ObjectId,
        ref: 'Product'
    },
}, { timestamps: true },{Collection:"seller"})
export const Seller=mongoose.models("Seller",sellerSchema)