import mongoose from "mongoose";
import connectDB from "../db/db.js";
import { Product } from "../models/product.model.js";

export const updateProduct=async(req,res)=>{
    const isConnected = mongoose.connection.readyState;

    if (isConnected !== 1)
    {
        await connectDB();
        res.json({message:"DB is not connected connecting again"}).status(500);
        return
    }
    const {productId,newProductName,newDescription,newPrice, newCategory,newMaterial}=req.body;
    const thumbnailLocalPath = req.files?.newThumbnail[0]?.path;
    const imagesLocalPath = req.files?.newImage[0]?.path;

    if (!thumbnailLocalPath || !imagesLocalPath) {
        return res.status(400).json({ message: "Thumbnail and images are required" });
    }
    try {
        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
        const image = await uploadOnCloudinary(imagesLocalPath);

        if (!thumbnail || !image) {
            return res.status(500).json({ message: "Failed to upload thumbnail and images to Cloudinary" });
        }

    const newProduct=await Product.updateOne({
        _id:productId,
        productName:newProductName,
        productDescription:newDescription,
        productCategory:newCategory,
        productMaterial:newMaterial,
        productPrice:newPrice,
        productImages:image,
        productThumbnail:thumbnail
    })
    res.json({message:"updated successfully",newProduct})
}catch(error){
res.json({message:"failed to update",error})
}
}