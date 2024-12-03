import { Router } from "express";
import { getSellerProduct } from "../controllers/getSellerProduct.controller.js";

const router = Router();
router.get("/:sellerId", getSellerProduct);
export default router;
