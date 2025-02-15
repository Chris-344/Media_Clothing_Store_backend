import { hash } from "bcrypt";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    itemsPrice: {
        type: Number,
        required: true
    },
    shippingPrice: {
        type: Number,
        required: true
    },
    taxPrice: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    mobileNo: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    addrCountry:  String,
    addrState: String,
    addrCity:  String,
    addrStreetName:  String,
    addrRoad:  String,
    addrPinCode:  String,
    addrLandmark:  String,
    profile: {
        type: String
    },
    orders: [orderSchema],  // Define orders as an array of orderSchema
    cart: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: Number
    }]
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    const hashedPassword = await hash(this.password, 10);
    this.password = hashedPassword;
    next();
});

export const User = mongoose.model("User", userSchema);

