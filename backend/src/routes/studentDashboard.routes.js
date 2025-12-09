import express from "express";
import  authMiddleware  from "../middleware/auth.middleware.js";
import { getStudentDashboard } from "../controllers/studentDashboard.controller.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, getStudentDashboard);

export default router;
