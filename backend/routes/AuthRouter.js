
import express from "express";
import { getAllUsersExceptMe, login, signup } from "../controller/AuthController.js";
import { authMiddleware } from "../middleware/Auht.js";



const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/other",authMiddleware,getAllUsersExceptMe)
export default router;
