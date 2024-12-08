import { Seller } from "../models/seller.model.js";

// Register Seller
export const registerSeller = async (req, res) =>
{
    const { name, email, password, PAN, contactNumber  } = req.body;
console.log( name, email, password, PAN, contactNumber );
    try
    {
        // Check if seller already exists
        const existingSeller = await Seller.findOne({ email });
        if (existingSeller)
        {
            return res.status(400).json({ message: 'Seller already exists' });
        }
        // Create new seller
        const seller = await Seller.create({
            sellerName: name,
            sellerEmail: email,
            sellerPassword: password,
            sellerPAN:PAN,
            sellerContactNumber: contactNumber,
        });
        res.status(200).json({seller, message: 'Seller registered successfully' });
    } catch (error)
    {
        res.status(500).json({ message: 'Server error', error });
    }
}

