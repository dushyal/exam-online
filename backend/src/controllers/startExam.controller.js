// import { sequelize } from "../config/db.js";
// import { Question } from "../models/question.model.js";
// import { Attempt } from "../models/attempt.model.js";

// // ============================
// // 1️⃣ GET RANDOM 10 QUESTIONS
// // ============================
// export const getExamQuestions = async (req, res) => {
//   try {
//     const { subject, level } = req.params;

//     const questions = await Question.findAll({
//       where: {
//         subject,
//         level_number: level,
//       },
//       order: sequelize.random(),   // RANDOM questions
//       limit: 10,                  
//     });

//     if (!questions.length) {
//       return res.status(404).json({ message: "No questions found" });
//     }

//     return res.json({
//       total: questions.length,
//       duration: 10,
//       questions,
//     });

//   } catch (error) {
//     console.error("Error fetching questions:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };


// // ============================
// // 2️⃣ SUBMIT EXAM (Add this!!!)
// // ============================
// export const submitExam = async (req, res) => {
//   try {
//     const { user_id, subject, level, answers } = req.body;

//     let score = 0;

//     const questions = await Question.findAll({
//       where: { subject, level_number: level },
//     });

//     questions.forEach((q) => {
//       if (answers[q.id] && answers[q.id] === q.correct_option) {
//         score += q.marks;
//       }
//     });

//     const pass_status = score >= 20 ? "pass" : "fail";

//     await Attempt.create({
//       user_id,
//       exam_id: 1,
//       attempt_number: 1,
//       started_at: new Date(),
//       submitted_at: new Date(),
//       status: "SUBMITTED",
//       score,
//       pass_status,
//     });

//     return res.json({
//       score,
//       pass_status,
//     });

//   } catch (error) {
//     console.error("Submit error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };



// import { Question } from "../models/question.model.js";
// import { Option } from "../models/option.model.js";
// import { Attempt } from "../models/attempt.model.js";
// import { sequelize } from "../config/db.js";

// // ==========================
// // 1️⃣ GET exam questions
// // ==========================
// export const getExamQuestions = async (req, res) => {
//   try {
//     const { subject, level } = req.params;

//     const questions = await Question.findAll({
//       where: {
//         subject,
//         level_number: level,
//       },
//       include: [
//         {
//           model: Option,
//           attributes: ["id", "text"], // don't send correct answer
//         },
//       ],
//       order: sequelize.random(), // optional: randomize questions
//       limit: 10,                 // only 10 questions
//     });

//     if (!questions.length) {
//       return res.status(404).json({ message: "No questions found" });
//     }

//     return res.json({
//       count: questions.length,
//       questions,
//     });
//   } catch (error) {
//     console.error("Get Questions Error:", error);
//     return res.status(500).json({ error: error.message });
//   }
// };

// // ==========================
// // 2️⃣ SUBMIT exam answers
// // ==========================
// export const submitExam = async (req, res) => {
//   try {
//     const { user_id, subject, level, answers } = req.body;

//     let score = 0;

//     const questions = await Question.findAll({
//       where: { subject, level_number: level },
//       include: [{ model: Option }],
//     });

//     questions.forEach((q) => {
//       const selectedOptionId = answers[q.id];
//       const correctOption = q.Options.find(opt => opt.is_correct);
//       if (selectedOptionId && correctOption && selectedOptionId === correctOption.id) {
//         score += q.marks;
//       }
//     });

//     const pass_status = score >= 20 ? "pass" : "fail";

//     const attempt = await Attempt.create({
//       user_id,
//       exam_id: 1,
//       attempt_number: 1,
//       started_at: new Date(),
//       submitted_at: new Date(),
//       status: "SUBMITTED",
//       score,
//       pass_status,
//     });

//     return res.json({
//       score,
//       pass_status,
//       attempt_id: attempt.id,
//     });
//   } catch (error) {
//     console.error("Submit Exam Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };










// import { Question } from "../models/question.model.js";
// import { Option } from "../models/option.model.js";
// import { Attempt } from "../models/attempt.model.js";
// import { sequelize } from "../config/db.js";

// // ==========================
// // 1️⃣ GET exam questions
// // =========================
// export const getExamQuestions = async (req, res) => {
//   try {
//     const { subject, level } = req.params;

//     const questions = await Question.findAll({
//       where: { subject, level_number: level },
//       include: [
//         {
//           model: Option,
//           attributes: ["id", "text"], // do not send correct answer
//         },
//       ],
//       order: sequelize.random(), // randomize questions
//       limit: 10,                 // only 10 questions
//     });

//     if (!questions.length) {
//       return res.status(404).json({ message: "No questions found for this subject/level" });
//     }

//     return res.json({
//       subject,
//       level,
//       count: questions.length,
//       questions,
//     });
//   } catch (error) {
//     console.error("Get Questions Error:", error);
//     return res.status(500).json({ error: error.message });
//   }
// };

// // ==========================
// // 2️⃣ SUBMIT exam answers
// // =========================
// export const submitExam = async (req, res) => {
//   try {
//     const { user_id, exam_id, subject, level, answers } = req.body;

//     let score = 0;

//     // Fetch all questions for this subject + level
//     const questions = await Question.findAll({
//       where: { subject, level_number: level },
//       include: [{ model: Option }],
//     });

//     questions.forEach((q) => {
//       const selectedOptionId = answers[q.id];
//       const correctOption = q.Options.find(opt => opt.is_correct);
//       if (selectedOptionId && correctOption && selectedOptionId === correctOption.id) {
//         score += q.marks;
//       }
//     });

//     const pass_status = score >= 20 ? "pass" : "fail";

//     const attempt = await Attempt.create({
//       user_id,
//       exam_id,               // actual exam attempted
//       attempt_number: 1,
//       started_at: new Date(),
//       submitted_at: new Date(),
//       status: "SUBMITTED",
//       score,
//       pass_status,
//     });

//     return res.json({
//       score,
//       pass_status,
//       attempt_id: attempt.id,
//     });
//   } catch (error) {
//     console.error("Submit Exam Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };






// import { Question } from "../models/question.model.js";
// import { Option } from "../models/option.model.js";
// import { Attempt } from "../models/attempt.model.js";
// import { Exam } from "../models/exam.model.js";
// import { sequelize } from "../config/db.js";


// // ==========================
// // 1️⃣ GET exam questions
// // =========================
// export const getExamQuestions = async (req, res) => {
//   try {
//     const { subject, level } = req.params;

//     const questions = await Question.findAll({
//       where: { subject, level_number: level },
//       include: [
//         {
//           model: Option,
//           attributes: ["id", "text" ,"is_correct"], // do not send correct answer
//         },
       
//       ],
//       order: sequelize.random(), // randomize questions
//       limit: 10,                 // only 10 questions
//     });

//     //  console.log(is_correct);

//     if (!questions.length) {
//       return res.status(404).json({ message: "No questions found for this subject/level" });
//     }

//     return res.json({
//       subject,
//       level,
//       count: questions.length,
//       questions,
//     });
//   } catch (error) {
//     console.error("Get Questions Error:", error);
//     return res.status(500).json({ error: error.message });
//   }
// };


// // SUBMIT exam answers
// export const submitExam = async (req, res) => {
//   try {
//     const { subject, level, answers } = req.body;

//     // 🔥 Always use JWT user id
//     const user_id = req.user.id;

//     // Find exam
//     const exam = await Exam.findOne({
//       where: { subject, level_number: level }
//     });

//     if (!exam) {
//       return res.status(404).json({ message: "Exam not found" });
//     }

//     const questions = await Question.findAll({
//       where: { subject, level_number: level },
//       include: [{ model: Option, as: "options" }],
//     });

//     if (!questions.length) {
//       return res.status(404).json({ message: "No questions found" });
//     }

//     let score = 0;
//     const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

//     questions.forEach((q) => {
//       const selectedOptionId = answers[q.id];
//       const correctOption = q.options.find((opt) => opt.is_correct);
//       if (selectedOptionId && correctOption && selectedOptionId === correctOption.id) {
//         score += q.marks;
//       }
//     });

//     const pass_status = score >= totalMarks * 0.4 ? "pass" : "fail";

//     // 🔥 Correct attempt create
//     const attempt = await Attempt.create({
//       user_id: user_id,      // REQUIRED
//       exam_id: exam.id,
//       attempt_number: 1,
//       started_at: new Date(),
//       submitted_at: new Date(),
//       status: "SUBMITTED",
//       score,
//       pass_status,
//     });

//     res.json({
//       score,
//       totalMarks,
//       pass_status,
//       attempt_id: attempt.id,
//     });

//   } catch (err) {
//     console.error("Submit Exam Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


import { Question } from "../models/question.model.js";
import { Option } from "../models/option.model.js";
import { Attempt } from "../models/attempt.model.js";
import { Exam } from "../models/exam.model.js";
import { sequelize } from "../config/db.js";

// ======================================
// 1️⃣ GET DYNAMIC EXAM QUESTIONS
// ======================================
export const getExamQuestions = async (req, res) => {
  try {
    const { subject, level } = req.params;

    // 1. find exam
    const exam = await Exam.findOne({
      where: { subject, level_number: level }
    });

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    let questions;

    // 2. MANUAL MODE (selected_questions)
    if (exam.mode === "manual") {
      const selectedIds = exam.selected_questions || [];

      questions = await Question.findAll({
        where: { id: selectedIds },
        include: [{
          model: Option,
          attributes: ["id", "text"]  // don't send answers
        }]
      });
    }

    // 3. AUTO MODE (random)
    else {
      questions = await Question.findAll({
        where: { subject, level_number: level },
        include: [{
          model: Option,
          attributes: ["id", "text"]
        }],
        order: sequelize.random(),
        limit: exam.total_questions,
      });
    }

    return res.json({
      exam_id: exam.id,
      subject,
      level,
      duration: exam.duration_minutes,
      total_questions: questions.length,
      start_time: exam.start_time,
      end_time: exam.end_time,
      questions
    });

  } catch (error) {
    console.error("Get Exam Error:", error);
    res.status(500).json({ error: error.message });
  }
};


// ======================================
// 2️⃣ SUBMIT EXAM ANSWERS
// ======================================
export const submitExam = async (req, res) => {
  try {
    const { subject, level } = req.params;
    const { answers } = req.body;

    const user_id = req.user.id;

    const exam = await Exam.findOne({
      where: { subject, level_number: level }
    });

    if (!exam) return res.status(404).json({ message: "Exam not found" });

    const questions = await Question.findAll({
      where: { subject, level_number: level },
      include: [{ model: Option, as: "options" }],
    });

    let score = 0;
    const totalMarks = questions.reduce((s, q) => s + q.marks, 0);

    questions.forEach(q => {
      const selected = answers[q.id];
      const correct = q.options.find(o => o.is_correct);

      if (selected && correct && selected == correct.id) {
        score += q.marks;
      }
    });

    const pass_status = score >= totalMarks * (exam.passing_percent / 100)
      ? "pass" : "fail";

    const attempt = await Attempt.create({
      user_id,
      exam_id: exam.id,
      attempt_number: 1,
      started_at: new Date(),
      submitted_at: new Date(),
      status: "SUBMITTED",
      score,
      pass_status
    });

    res.json({
      score,
      totalMarks,
      pass_status,
      attempt_id: attempt.id
    });

  } catch (err) {
    console.error("Submit Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
