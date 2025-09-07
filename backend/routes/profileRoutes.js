import express from "express";
import { getUser, updateUser } from "../controller/profileController.js";


const router = express.Router();
// Get profile by userId
router.get("/:id", getUser); // ✅ Correct
router.put("/:id", updateUser);

export default router;
