import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../util/cloudinary.js";
import connectDB from "../db/db.js";

export const addProduct = async (req, res) => {
    try {
        const isConnected = mongoose.connection.readyState;
        if (isConnected !== 1) {
            await connectDB();
            console.log("DB connected successfully");
        }

        // Validate required fields
        const { name, description, price, category, material } = req.body;
        if (!name || !description || !price || !category || !material) {
            return res.status(400).json({ 
                message: "All fields are required" 
            });
        }

        // Validate files
        if (!req.files?.thumbnail?.[0] || !req.files?.images || req.files.images.length === 0) {
            return res.status(400).json({ 
                message: "Thumbnail and at least one image are required" 
            });
        }

        // Upload thumbnail
        const thumbnailResult = await uploadOnCloudinary(req.files.thumbnail[0].path);
        if (!thumbnailResult?.url) {
            return res.status(500).json({ 
                message: "Failed to upload thumbnail" 
            });
        }

        // Upload images
        const imageResults = await Promise.all(
            req.files.images.map(file => uploadOnCloudinary(file.path))
        );

        const imageUrls = imageResults
            .filter(result => result?.url)
            .map(result => result.url);

        if (imageUrls.length === 0) {
            return res.status(500).json({ 
                message: "Failed to upload product images" 
            });
        }

        // Create product
        const newProduct = await Product.create({
            productName: name,
            productDescription: description,
            productPrice: price,
            productCategory: category,
            productMaterial: material,
            productThumbnail: thumbnailResult.url,
            productImages: imageUrls,
        });

        res.status(201).json({ 
            message: "Product added successfully", 
            product: newProduct 
        });

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ 
            message: "Failed to add product", 
            error: error.message 
        });
    }
};