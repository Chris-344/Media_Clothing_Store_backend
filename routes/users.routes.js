import { Router } from "express";
import { Login } from "../controllers/login.controller.js";
import { add_address, SignUpUser } from "../controllers/signUp.controller.js";
import { placeOrder } from "../controllers/placedOrder.controller.js";
const router = Router();
router.post("/login", Login).post("/signUp", SignUpUser);
router.get("/cartItems").put("/addCart")
router.put("/placeOrder",placeOrder)
router.post('/add_address',add_address)
export default router;
