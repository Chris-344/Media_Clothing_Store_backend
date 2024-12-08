import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    sellerName: {
      type: String,
      required: true,
    },
    sellerEmail:{
      type:String,
      required:['@']
    },
    sellerPAN_No: {
      type: String,
      required:  true,
    },
    sellerContactNumber:{
      type:Number
    },
      addrCountry: String,
      addrState: String,
      addrCity: String,
      addrPinCode: Number,
      addrLandmark: String,
    sellerProduct: {
      type: mongoose.ObjectId,
      ref: "Product",
    },
    sellerPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
  { collection: "seller" },
);
sellerSchema.pre("save", async function (next) {
  const hashedPassword = await hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

export const Seller = mongoose.model("Seller", sellerSchema);
