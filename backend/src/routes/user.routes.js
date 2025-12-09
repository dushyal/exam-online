import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  registerUser,
  loginUser,
  getUserProfile,
  toggleBlockUser,
  deleteUser,
  getUserProfileDash,
} from "../controllers/user.controller.js";

const router = express.Router();
router.get("/profile", authMiddleware, getUserProfileDash);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUserProfile);
router.put("/block/:id", toggleBlockUser);
router.delete("/:id", deleteUser);

export default router;
