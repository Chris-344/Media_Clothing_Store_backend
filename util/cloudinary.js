import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import 'dotenv/config'


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const uploadOnCloudinary = async (localFilePath) =>
{
    try
    {
        if (!localFilePath) {console.log("could not found file path"); 
            return null
        }
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        //file has been uploaded successfully
        console.log("file is uploaded on cloud", response.url);
        fs.unlinkSync(localFilePath)
        return response
    } catch (error)
    {
        console.error(`failed to upload file ${error}`);
        fs.unlinkSync(localFilePath)
        //remove the locally saved file if uploading failed
    }
}
export { uploadOnCloudinary }