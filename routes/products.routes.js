import { Router } from "express";
import { addProduct } from "../controllers/addProduct.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { deleteProduct } from "../controllers/deleteProduct.controller.js";
import { getProduct } from "../controllers/getProduct.controller.js";
import { updateProduct } from "../controllers/updateProduct.controller.js";

const router = Router();
router
  .post(
    "/addProduct",
    upload.fields([
      {
        name: "thumbnail",
        maxCount: 1,
      },
      {
        name: "images",
        maxCount: 6,
      },
    ]),
    addProduct,
  )
  .get("/getProduct", getProduct)
  .delete("/deleteProduct", deleteProduct)
  .put("/updateProduct", upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 5,
    },
  ]),updateProduct);
export default router;
