// import { Question } from "../models/question.model.js";
// import { ExamAttempt } from "../models/examAttempt.model.js";

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

//     await ExamAttempt.create({
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
// import { ExamAttempt } from "../models/examAttempt.model.js";

// export const submitExam = async (req, res) => {
//   try {
//     const { exam_id, subject, level, answers } = req.body;
//     const user_id = req.user.id;

//     // 1️⃣ Validate input
//     if (!exam_id || !subject || !level || !answers) {
//       return res.status(400).json({
//         message: "Exam ID, subject, level, and answers are required"
//       });
//     }

//     // 2️⃣ Fetch questions for this exam
//     const questions = await Question.findAll({
//       where: { subject, level_number: level },
//     });

//     if (!questions || questions.length === 0) {
//       return res.status(404).json({ message: "No questions found" });
//     }

//     // 3️⃣ Calculate score
//     let score = 0;
//     for (let q of questions) {
//       const selectedOptionId = answers[q.id];
//       if (!selectedOptionId) continue;

//       const correctOption = await Option.findOne({
//         where: { question_id: q.id, is_correct: true }
//       });

//       if (correctOption && correctOption.id == selectedOptionId) {
//         score += q.marks;
//       }
//     }

//     const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
//     const passMarks = Math.floor(totalMarks * 0.4);
//     const pass_status = score >= passMarks ? "pass" : "fail";

//     // 4️⃣ Determine attempt number dynamically
//     const previousAttempts = await ExamAttempt.count({
//       where: { user_id, exam_id }
//     });
//     const attemptNumber = previousAttempts + 1;

//     // 5️⃣ Save exam attempt in 'attempt' table
//     await ExamAttempt.create({
//       user_id,
//       exam_id,
//       attempt_number: attemptNumber,
//       started_at: new Date(),   // optionally, send actual start time from frontend
//       submitted_at: new Date(),
//       status: "SUBMITTED",
//       score,
//       pass_status
//     });

//     // 6️⃣ Send response
//     return res.json({
//       score,
//       totalMarks,
//       passMarks,
//       pass_status,
//       attemptNumber
//     });

//   } catch (error) {
//     console.error("Submit Exam Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };








// import { Question } from "../models/question.model.js";
// import { Option } from "../models/option.model.js";
// import { ExamAttempt } from "../models/examAttempt.model.js";

// /**
//  * Fetch exam questions dynamically based on subject and level
//  */
// export const getExamQuestions = async (req, res) => {
//   try {
//     const { subject, level } = req.params;

//     if (!subject || !level) {
//       return res.status(400).json({ message: "Subject and level are required" });
//     }

//     const questions = await Question.findAll({
//       where: { subject, level_number: level },
//       include: [
//         {
//           model: Option,
//           attributes: ["id", "text"], // hide is_correct
//         },
//       ],
//     });

//     if (!questions.length) {
//       return res.status(404).json({ message: "No questions found for this level" });
//     }

//     return res.json({
//       count: questions.length,
//       duration: 10, // exam duration in minutes, can be dynamic per subject/level
//       questions,
//     });
//   } catch (err) {
//     console.error("Get Questions Error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// /**
//  * Submit exam answers dynamically and calculate score
//  */
// export const submitExam = async (req, res) => {
//   try {
//     const { subject, level } = req.params;
//     const { exam_id, answers } = req.body;
//     const user_id = req.user.id;

//     if (!exam_id || !answers) {
//       return res.status(400).json({ message: "Exam ID and answers are required" });
//     }

//     // Fetch all questions for this subject and level
//     const questions = await Question.findAll({
//       where: { subject, level_number: level },
//     });

//     if (!questions.length) {
//       return res.status(404).json({ message: "No questions found" });
//     }

//     let score = 0;

//     // Compare user's answers with correct options
//     for (let q of questions) {
//       const selectedOptionId = answers[q.id];
//       if (!selectedOptionId) continue;

//       const correctOption = await Option.findOne({
//         where: { question_id: q.id, is_correct: true },
//       });

//       if (correctOption && correctOption.id === selectedOptionId) {
//         score += q.marks;
//       }
//     }

//     const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
//     const passMarks = Math.floor(totalMarks * 0.4); // 40% passing
//     const pass_status = score >= passMarks ? "pass" : "fail";

//     // Dynamic attempt number
//     const previousAttempts = await ExamAttempt.count({ where: { user_id, exam_id } });
//     const attemptNumber = previousAttempts + 1;

//     // Save attempt
//     await ExamAttempt.create({
//       user_id,
//       exam_id,
//       attempt_number: attemptNumber,
//       started_at: new Date(), // optionally send actual start time from frontend
//       submitted_at: new Date(),
//       status: "SUBMITTED",
//       score,
//       pass_status,
//     });

//     return res.json({
//       score,
//       totalMarks,
//       passMarks,
//       pass_status,
//       attemptNumber,
//     });
//   } catch (err) {
//     console.error("Submit Exam Error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };









// import { Question } from "../models/question.model.js";
// import { Option } from "../models/option.model.js";
// import { Exam } from "../models/exam.model.js";
// import { ExamAttempt } from "../models/examAttempt.model.js";

// export const submitExam = async (req, res) => {
//   try {
//     const { subject, level } = req.params; // ✅ from URL params
//     const { answers } = req.body;
//     const user_id = req.user.id;

//     if (!answers || Object.keys(answers).length === 0) {
//       return res.status(400).json({ message: "Answers are required" });
//     }

//     // 1️⃣ Fetch the exam for this subject & level
//     const exam = await Exam.findOne({
//       where: { subject, level_number: level },
//     });

//     if (!exam) {
//       return res.status(404).json({ message: "Exam not found" });
//     }

//     // 2️⃣ Fetch questions for this exam
//     const questions = await Question.findAll({
//       where: { exam_id: exam.id },
//     });

//     if (!questions || questions.length === 0) {
//       return res.status(404).json({ message: "No questions found" });
//     }

//     // 3️⃣ Calculate score
//     let score = 0;
//     for (let q of questions) {
//       const selectedOptionId = answers[q.id];
//       if (!selectedOptionId) continue;

//       const correctOption = await Option.findOne({
//         where: { question_id: q.id, is_correct: true },
//       });

//       if (correctOption && correctOption.id == selectedOptionId) {
//         score += q.marks;
//       }
//     }

//     const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
//     const passMarks = Math.floor(totalMarks * 0.4);
//     const pass_status = score >= passMarks ? "pass" : "fail";

//     // 4️⃣ Determine attempt number dynamically
//     const previousAttempts = await ExamAttempt.count({
//       where: { user_id, exam_id: exam.id },
//     });
//     const attemptNumber = previousAttempts + 1;

//     // 5️⃣ Save exam attempt
//     await ExamAttempt.create({
//       user_id,
//       exam_id: exam.id,
//       attempt_number: attemptNumber,
//       started_at: new Date(), // you can pass real start time if you track it
//       submitted_at: new Date(),
//       status: "SUBMITTED",
//       score,
//       pass_status,
//     });

//     // 6️⃣ Send response
//     return res.json({
//       score,
//       totalMarks,
//       passMarks,
//       pass_status,
//       attemptNumber,
//       exam_id: exam.id,
//     });
//   } catch (error) {
//     console.error("Submit Exam Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };




// import { Exam } from "../models/exam.model.js";
// import { Question } from "../models/question.model.js";
// import { Option } from "../models/option.model.js";
// import { Attempt } from "../models/attempt.model.js";

// export const submitExam = async (req, res) => {
//   const { subject, level } = req.params;
//   const { answers } = req.body;
//   const user_id = req.user.id;

//   try {
//     // Find the exam
//     const exam = await Exam.findOne({ where: { subject, level_number: level } });
//     if (!exam) return res.status(404).json({ message: "Exam not found" });

//     // Fetch all questions for this subject + level
//     const questions = await Question.findAll({
//       where: { subject, level_number: level },
//       include: [{ model: Option }],
//     });

//     // Calculate score
//     let score = 0;
//     const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

//     for (let q of questions) {
//       const selectedOptionId = answers[q.id];
//       const correctOption = q.Options.find(opt => opt.is_correct);
//       if (selectedOptionId && correctOption && selectedOption.id === selectedOptionId) {
//         score += q.marks;
//       }
//     }

//     const passMarks = Math.floor(totalMarks * 0.4);
//     const pass_status = score >= passMarks ? "pass" : "fail";

//     // Count previous attempts
//     const previousAttempts = await Attempt.count({
//       where: { user_id, exam_id: exam.id }, // ✅ use exam.id here
//     });
//     const attemptNumber = previousAttempts + 1;

//     // Create attempt
//     const attempt = await Attempt.create({
//       user_id,
//       exam_id: exam.id, // ✅ use exam.id here, NOT exam_id variable
//       attempt_number: attemptNumber,
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
//       attemptNumber: attempt.attempt_number,
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

// export const submitExam = async (req, res) => {
//   try {
//     const { answers } = req.body;
//     const { subject, level } = req.params;
//     const user_id = req.user.id;

//     // Find the exam
//     const exam = await Exam.findOne({
//       where: { subject, level_number: level },
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

//     // Calculate score
//     let score = 0;
//     const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

//     questions.forEach((q) => {
//       const selectedOptionId = answers[q.id];
//       const correctOption = q.options.find((opt) => opt.is_correct);
//       if (selectedOptionId && correctOption && selectedOptionId == correctOption.id) {
//         score += q.marks;
//       }
//     });

//     const pass_status = score >= totalMarks * 0.4 ? "pass" : "fail";

//     // AUTO attempt number
//     const previousAttempts = await Attempt.count({
//       where: {
//         user_id,
//         exam_id: exam.id
//       }
//     });

//     const attemptNumber = previousAttempts + 1;

//     // Create attempt
//     const attempt = await Attempt.create({
//       user_id,
//       exam_id: exam.id,
//       attempt_number: attemptNumber,
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
//       attemptNumber,
//       attempt_id: attempt.id
//     });

//   } catch (err) {
//     console.error("Submit Exam Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };



export const submitExam = async (req, res) => {
  try {
    const { subject, level } = req.params;
    const { answers } = req.body;

    const user_id = req.user.id; // 🔥 GET USER ID FROM TOKEN

    const questions = await Question.findAll({
      where: { subject, level_number: level },
      include: [
        {
          model: Option,
          as: "options",
        },
      ],
    });

    if (!questions.length) {
      return res.status(404).json({ message: "No questions found" });
    }

    let score = 0;
    const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

    questions.forEach((q) => {
      const selectedOptionId = answers[q.id];
      const correctOption = q.options.find((opt) => opt.is_correct);

      if (selectedOptionId && correctOption && selectedOptionId === correctOption.id) {
        score += q.marks;
      }
    });

    const pass_status = score >= totalMarks * 0.4 ? "pass" : "fail";

    const attempt = await Attempt.create({
      user_id,             // 🔥 FIXED
      exam_id: q.exam_id,  // ❗️You must fix this later if needed
      attempt_number: 1,
      started_at: new Date(),
      submitted_at: new Date(),
      status: "SUBMITTED",
      score,
      pass_status,
    });

    res.json({ score, totalMarks, pass_status, attempt_id: attempt.id });
  } catch (err) {
    console.error("Submit Exam Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
