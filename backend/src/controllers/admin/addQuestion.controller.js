// import { VscAccount } from "react-icons/vs"; 
// import { Question } from "../../models/question.model.js";
// import { Option } from "../../models/option.model.js";

// export const addQuestion = async (req, res) => {
//   try {
//     const {
//       exam_id,
//       subject,
//       level_number,
//       question,
//       optionA,
//       optionB,
//       optionC,
//       optionD,
//       correctAnswer
//     } = req.body;

//     if (!exam_id || !subject || !question || !correctAnswer || !level_number) {
//       return res.status(400).json({ message: "Missing fields" });
//     }

//     // Create the question
//     const newQuestion = await Question.create({
//       exam_id,
//       subject,
//       level_number,
//       text: question,
//       type: "MCQ",
//       marks: 1
//     });

//     // Create options
//     const optionList = [
//       { text: optionA, is_correct: correctAnswer === "A" ? 1 : 0 },
//       { text: optionB, is_correct: correctAnswer === "B" ? 1 : 0 },
//       { text: optionC, is_correct: correctAnswer === "C" ? 1 : 0 },
//       { text: optionD, is_correct: correctAnswer === "D" ? 1 : 0 }
//     ];

//     for (let opt of optionList) {
//       await Option.create({
//         question_id: newQuestion.id,
//         text: opt.text,
//         is_correct: opt.is_correct
//       });
//     }

//     return res.json({
//       message: "Question added successfully!",
//       question: newQuestion
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };










import { Question } from "../../models/question.model.js";
import { Option } from "../../models/option.model.js";

// ---------------- Add Question ----------------
export const addQuestion = async (req, res) => {
  try {
    const { subject, level_number, question, optionA, optionB, optionC, optionD, correctAnswer } = req.body;

    if (!subject || !question || !correctAnswer || !level_number) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const newQuestion = await Question.create({
      exam_id : null,
      subject,
      level_number,
      text: question,
      type: "MCQ",
      marks: 1
    });

    const options = [
      { text: optionA, is_correct: correctAnswer === "A" ? 1 : 0 },
      { text: optionB, is_correct: correctAnswer === "B" ? 1 : 0 },
      { text: optionC, is_correct: correctAnswer === "C" ? 1 : 0 },
      { text: optionD, is_correct: correctAnswer === "D" ? 1 : 0 }
    ];

    for (const opt of options) {
      await Option.create({
        question_id: newQuestion.id,
        text: opt.text,
        is_correct: opt.is_correct
      });
    }

    return res.json({
      success: true,
      message: "Question added successfully!",
      question_id: newQuestion.id
    });

  } catch (error) {
    console.error("Add Question Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// ---------------- Delete Question ----------------
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    await Option.destroy({ where: { question_id: id } });
    await Question.destroy({ where: { id } });

    return res.json({ success: true, message: "Question deleted successfully" });
  } catch (err) {
    console.error("Delete Question Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Update Question ----------------
// export const updateQuestion = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { subject, level_number, question, optionA, optionB, optionC, optionD, correctAnswer } = req.body;

//     // Update question text & metadata
//     await Question.update(
//       { subject, level_number, text: question },
//       { where: { id } }
//     );

//     // Update options
//     const options = await Option.findAll({ where: { question_id: id } });
//     const optionValues = [optionA, optionB, optionC, optionD];

//     for (let i = 0; i < options.length; i++) {
//       await options[i].update({
//         text: optionValues[i],
//         is_correct: correctAnswer === ["A", "B", "C", "D"][i] ? 1 : 0
//       });
//     }

//     return res.json({ success: true, message: "Question updated successfully" });

//   } catch (err) {
//     console.error("Update Question Error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };


export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      subject,
      level_number,
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer
    } = req.body;

    // Update main question
    await Question.update(
      {
        subject,
        level_number,
        text: question
      },
      { where: { id } }
    );

    // Fetch existing options
    const options = await Option.findAll({ where: { question_id: id } });

    // Correct answer mapping
    const letters = ["A", "B", "C", "D"];
    const optionValues = [optionA, optionB, optionC, optionD];

    for (let i = 0; i < options.length; i++) {
      await options[i].update({
        text: optionValues[i],
        is_correct: correctAnswer === letters[i] ? 1 : 0
      });
    }

    return res.json({
      success: true,
      message: "Question updated successfully"
    });

  } catch (err) {
    console.error("Update Question Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


// ---------------- Get All Questions ----------------
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll({ include: [{ model: Option }] });
    return res.json({ questions });
  } catch (err) {
    console.error("Get Questions Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};



// Get single question by ID
export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByPk(id, { include: [Option] });

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.json({ question });
  } catch (err) {
    console.error("Get Question By ID Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
