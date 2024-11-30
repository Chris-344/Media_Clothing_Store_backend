import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../util/cloudinary.js";
import  connectDB  from "../db/db.js";

export const addProduct = async (req, res) => {
    const isConnected = mongoose.connection.readyState;

    if (isConnected !== 1)
    {
        await connectDB();
        console.log("DB is not connected connecting again");
        return
    }
    const { name, description, price, category, seller, material } = req.body;
    const thumbnailLocalPath = req.files?.thumbnail[0]?.path;
    const imagesLocalPath = req.files?.images[0]?.path;

    if (!thumbnailLocalPath || !imagesLocalPath) {
        return res.status(400).json({ message: "Thumbnail and images are required" });
    }

    try {
        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
        const images = await uploadOnCloudinary(imagesLocalPath);

        if (!thumbnail || !images) {
            return res.status(500).json({ message: "Failed to upload thumbnail and images to Cloudinary" });
        }

        console.log(`Product created: ${name}, ${description}, ${category}, ${price}, ${material}, ${seller}, ${images.url}, ${thumbnail.url}`);
        
        const newProduct = await Product.create({
            productName: name,
            productDescription: description,
            productPrice: price,
            productCategory: category,
            productMaterial: material,
            productThumbnail: thumbnail.url,
            productImages: images.url,
            productSeller: seller
        });

        res.status(201).json({ message: "Product added successfully",   newProduct });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Failed to add product", error });
    }
};
