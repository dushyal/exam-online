import express from "express";
import authMiddleware from "../middleware/auth.Middleware.js";
import { Exam } from "../models/exam.model.js";
import { Attempt } from "../models/attempt.model.js";

const router = express.Router();

/* ------------------------------------------
| 1️⃣ GET PENDING EXAM
------------------------------------------- */
router.get("/candidate/pending-exam", authMiddleware, async (req, res) => {
  try {
    const exam = await Exam.findOne({
      where: { level: 1 }, // change logic if needed
    });

    if (!exam) return res.json({ pending: false });

    const attempt = await Attempt.findOne({
      where: { user_id: req.user.id, exam_id: exam.id },
    });

    if (attempt) return res.json({ pending: false });

    res.json({
      pending: true,
      exam: {
        id: exam.id,
        title: exam.title,
        level: exam.level,
        duration: exam.duration,
      },
    });
  } catch (err) {
    console.error("PENDING EXAM ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ------------------------------------------
| 2️⃣ GET CANDIDATE EXAM SUMMARY
------------------------------------------- */
router.get("/candidate/summary", authMiddleware, async (req, res) => {
  try {
    const attempts = await Attempt.findAll({
      where: { user_id: req.user.id },
      include: [{ model: Exam }],
    });

    res.json({ attempts });
  } catch (err) {
    console.error("EXAM SUMMARY ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
