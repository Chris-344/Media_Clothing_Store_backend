import { Router } from "express";
import { addProduct } from "../controllers/addProduct.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router=Router()
router.post('/addProduct',upload.fields([
    {
        name:"thumbnail",
        maxCount:1
    },
    {
        name:"images",
        maxCount:5
    }
]),addProduct)
export default router