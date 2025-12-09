import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getSubjectDetails } from "../controllers/subject.controller.js";

const router = express.Router();

// GET single subject details
router.get("/:subjectName", authMiddleware, getSubjectDetails);

export default router;
