import express from "express";
import authMiddleware from "../../middleware/auth.Middleware.js";
import { adminOnly } from "../../middleware/adminOnly.js";
import { getAllResults } from "../../controllers/admin/adminResults.controller.js";

const router = express.Router();

router.get("/", authMiddleware, adminOnly, getAllResults);

export default router;

