import mongoose, { Collection } from "mongoose";

const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productCategory:{
        type:String
    },
    productSeller:{
        type:String,
        required:true
    },
    productMaterial:{
        type:String,
    },


},{timestamps:true},{Collection:"product"})
export const product=mongoose.model("Product",productSchema)