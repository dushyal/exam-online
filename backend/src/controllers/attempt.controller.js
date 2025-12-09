// controllers/attempt.controller.js
import { Attempt } from "../models/attempt.model.js";
import { Answer } from "../models/answer.model.js";
import { Question } from "../models/question.model.js";
import { Option } from "../models/option.model.js";

export const startAttempt = async (req, res) => {
  const { examId } = req.params;
  const userId = req.user.id; // from auth middleware
  // calculate attempt_number by counting previous attempts...
  const attempt = await Attempt.create({ user_id: userId, exam_id: examId, attempt_number: 1, started_at: new Date(), status: "IN_PROGRESS" });
  res.json({ attempt });
};

export const submitAttempt = async (req, res) => {
  const { attemptId } = req.params;
  const { answers } = req.body; // array [{ question_id, option_id, text_answer }]

  // save answers
  for (const a of answers) {
    await Answer.create({
      attempt_id: attemptId,
      question_id: a.question_id,
      option_id: a.option_id || null,
      text_answer: a.text_answer || null,
      marks_awarded: 0
    });
  }

  // evaluate MCQs
  let score = 0;
  for (const a of answers) {
    if (a.option_id) {
      const opt = await Option.findByPk(a.option_id);
      if (opt && opt.is_correct) {
        const q = await Question.findByPk(a.question_id);
        score += q.marks || 0;
        await Answer.update({ marks_awarded: q.marks }, { where: { attempt_id: attemptId, question_id: a.question_id }});
      }
    }
  }

  const pass = score >= 50 ? "PASS" : "FAIL"; // depends on exam.passing_percent
  await Attempt.update({ score, pass_status: pass, submitted_at: new Date(), status: "COMPLETED" }, { where: { id: attemptId }});
  res.json({ score, pass_status: pass });
};
