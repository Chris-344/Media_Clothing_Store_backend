import { User } from "../models/user.model.js";

export const shippingAddress = async (req, res) => {
    const {
        userId,
        country,
        state,
        city,
        streetName,
        pinCode,
        landmark,
        road,
    } = req.body;

    try {
        console.log(userId, country, state, city, streetName, pinCode, landmark, road);

        if (!userId || !country || !state || !city || !streetName || !pinCode || !landmark || !road) {
            return res.status(400).json({
                message: "Address is empty",
                userId,
                country,
                state,
                city,
                streetName,
                pinCode,
                landmark,
                road,
            });
        }

        const user = await User.updateOne(
            { _id: userId },
            {
                addrCountry: country,
                addrState: state,
                addrCity: city,
                addrStreetName: streetName,
                addrRoad: road,
                addrPinCode: pinCode,
                addrLandmark: landmark,
            }
        );

        res.status(200).json({ message: "Success", user });
    } catch (error) {
        res.status(500).json({ message: "Failed" });
    }
};
