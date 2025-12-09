import { Exam } from "../models/exam.model.js";
import { Attempt } from "../models/attempt.model.js";

/* ------------------------------------------
| GET PENDING EXAM
------------------------------------------- */
export const getPendingExam = async (req, res) => {
  try {
    // Find the lowest-level exam
    const exam = await Exam.findOne({ order: [["level_number", "ASC"]] });

    if (!exam) return res.json({ pending_exam: null });

    // Check if user already attempted this exam
    const attempt = await Attempt.findOne({
      where: { user_id: req.user.id, exam_id: exam.id }
    });

    if (attempt) {
      return res.json({ pending_exam: null });
    }

    return res.json({
      pending_exam: {
        id: exam.id,
        title: exam.title,
        level_number: exam.level_number,
        duration_minutes: exam.duration_minutes
      }
    });
  } catch (err) {
    console.error("PENDING EXAM ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/* ------------------------------------------
| GET SUMMARY (RECENT EXAM RESULTS)
------------------------------------------- */
export const getExamSummary = async (req, res) => {
  try {
    const attempts = await Attempt.findAll({
      where: { user_id: req.user.id },
      include: [{ model: Exam }]
    });

    const summary = attempts.map(a => ({
      level: a.Exam.level_number,
      score: a.score,
      exam_title: a.Exam.title
    }));

    res.json({ summary });
  } catch (err) {
    console.error("SUMMARY ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};
