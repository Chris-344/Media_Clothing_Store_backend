import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        productDescription: {
            type: String,
            required: true,
        },
        productPrice: {
            type: Number,
            required: true,
        },
        productThumbnail: {
            type: String,
        },
        productImages: {
            type: [String],
        },
        productCategory: {
            type: String,
        },
        productMaterial: {
            type: String,
        },
        productSeller: {
            type: String,
        },
        productSellerId: {
            type: mongoose.Types.ObjectId,
            ref: "Seller",
        },
    },
    { timestamps: true },
    { collection: "product" },
);

export const Product = mongoose.model("Product", productSchema);

