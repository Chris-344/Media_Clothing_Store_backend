import { Router } from "express";
import { Login } from "../controllers/login.controller.js";
import { add_address, SignUpUser } from "../controllers/signUp.controller.js";
import { placeOrder } from "../controllers/placedOrder.controller.js";
import { shippingAddress } from "../controllers/shippingAddress.controller.js";
import { invoice } from "../controllers/invoice.controller.js";
const router = Router();
router.post("/login", Login).post("/signUp", SignUpUser);
router.get("/cartItems").put("/addCart")
router.post("/placeOrder",placeOrder)
router.post('/add_address',add_address)
router.post('/shipping_address',shippingAddress)
router.get('/placeOrder/downloadInvoice',invoice)
export default router;
