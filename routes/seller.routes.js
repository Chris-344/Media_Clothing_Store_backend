import { Router } from "express";
import { getSellerProduct } from "../controllers/getSellerProduct.controller.js";
import { registerSeller } from "../controllers/registerSeller.controller.js";

const router = Router();
router.get("/login", getSellerProduct).post("/register",registerSeller)
export default router;
