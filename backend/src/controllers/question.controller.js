// import { Question } from "../models/question.model.js";
// import { sequelize } from "../config/db.js";

// // GET exam questions (random 10)
// export const getExamQuestions = async (req, res) => {
//   const { subject, level } = req.params;

//   try {
//     const questions = await Question.findAll({
//       where: {
//         subject: subject,
//         level_number: Number(level),
//       },
//       order: sequelize.random(),
//       limit: 10,
//     });

//     if (questions.length === 0) {
//       return res.status(404).json({ message: "No questions found" });
//     }

//     res.json({
//       questions,
//       duration: 10,
//     });

//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };



// // SUBMIT exam
// export const submitExam = async (req, res) => {
//   const { answers } = req.body;

//   try {
//     let score = 0;

//     for (const qid in answers) {
//       const ans = answers[qid];

//       const question = await Question.findByPk(qid);

//       if (question && question.correct === ans) {
//         score += question.marks;
//       }
//     }

//     res.json({ score });

//   } catch (err) {
//     console.error("Submit Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };







import { Question } from "../models/question.model.js";
import { Option } from "../models/option.model.js";
import { sequelize } from "../config/db.js";

// GET exam questions (random 10)
export const getExamQuestions = async (req, res) => {
  const { subject, level } = req.params;

  try {
    const questions = await Question.findAll({
      where: {
        subject,
        level_number: Number(level),
      },
      include: [
        {
          model: Option,
          attributes: ["id", "text"], // send options without correct answer
        },
      ],
      order: sequelize.random(),
      limit: 10,
    });

    if (!questions.length) {
      return res.status(404).json({ message: "No questions found" });
    }

    res.json({
      questions,
      duration_minutes: 10, // or fetch real exam duration
    });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// SUBMIT exam
export const submitExam = async (req, res) => {
  const { answers } = req.body;

  try {
    let score = 0;

    for (const qid in answers) {
      const ans = answers[qid];

      const question = await Question.findByPk(qid, {
        include: [{ model: Option }],
      });

      if (question) {
        const correctOption = question.Options.find((opt) => opt.is_correct);
        if (correctOption && correctOption.id == ans) {
          score += question.marks;
        }
      }
    }

    res.json({ score });

  } catch (err) {
    console.error("Submit Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
