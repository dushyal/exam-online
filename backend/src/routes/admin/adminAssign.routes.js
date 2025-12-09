import express from "express";
import { Attempt } from "../../models/index.js";
import { adminOnly } from "../../middleware/adminOnly.js";

const router = express.Router();

router.post("/assign", adminOnly, async (req, res) => {
  const { user_id, exam_id } = req.body;

  const existing = await Attempt.findOne({ where: { user_id, exam_id } });

  if (existing)
    return res.json({ message: "This user already has access to this exam" });

  await Attempt.create({
    user_id,
    exam_id,
    status: "NOT_STARTED",
    attempt_number: 1,
  });

  res.json({ message: "Exam assigned successfully" });
});

export default router;
