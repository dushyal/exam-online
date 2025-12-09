
import express from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import examRoutes from "./exam.routes.js";
import adminQuestionRoutes from "./admin/adminQuestion.routes.js"
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/exam", examRoutes);
router.use("/questions", adminQuestionRoutes);

export default router;
