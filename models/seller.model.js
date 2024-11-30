import mongoose  from "mongoose";

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
    sellerPassword:{
        type:String,
        required:true
    }
}, { timestamps: true },{collection:"seller"})
sellerSchema.pre('save', async function (next)
{
    const hashedPassword = await hash(this.password, 10)
    this.password = hashedPassword
    next()
})

export const Seller=mongoose.models("Seller",sellerSchema)