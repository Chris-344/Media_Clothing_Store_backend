import { Router } from "express";
import { Login } from "../controllers/login.controller.js";
import { SignUpUser } from "../controllers/signUp.controller.js";
const router = Router();

router.post("/login", Login).post("/signUp", SignUpUser);
router.get("/cartItems").put("/addCart");
export default router;
