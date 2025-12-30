// import express from "express";
// import { Question, Option } from "../../models/index.js";
// import { adminOnly } from "../../middleware/adminOnly.js";

// const router = express.Router();

// // -------- Add Question --------
// router.post("/add", adminOnly, async (req, res) => {
//   try {
//     const question = await Question.create(req.body);
//     res.json({ message: "Question added", question });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // -------- Update Question --------
// router.put("/:id", adminOnly, async (req, res) => {
//   await Question.update(req.body, { where: { id: req.params.id } });
//   res.json({ message: "Question updated" });
// });

// // -------- Delete Question --------
// router.delete("/:id", adminOnly, async (req, res) => {
//   await Question.destroy({ where: { id: req.params.id } });
//   await Option.destroy({ where: { question_id: req.params.id } });
//   res.json({ message: "Question deleted" });
// });

// export default router;




// import express from "express";
// import { Question, Option } from "../../models/index.js";
// import { adminOnly } from "../../middleware/adminOnly.js";

// const router = express.Router();

// // -------- Get All Questions --------
// router.get("/", adminOnly, async (req, res) => {
//   try {
//     const questions = await Question.findAll({
//       include: [{ model: Option }]
//     });

//     res.json({ questions });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // -------- Add Question --------
// router.post("/add", adminOnly, async (req, res) => {
//   try {
//     const question = await Question.create(req.body);
//     res.json({ message: "Question added", question });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // -------- Update Question --------
// router.put("/:id", adminOnly, async (req, res) => {
//   try {
//     await Question.update(req.body, { where: { id: req.params.id } });
//     res.json({ message: "Question updated" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // -------- Delete Question --------
// router.delete("/:id", adminOnly, async (req, res) => {
//   try {
//     await Option.destroy({ where: { question_id: req.params.id } });
//     await Question.destroy({ where: { id: req.params.id } });

//     res.json({ message: "Question deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// export default router;





// import express from "express";
// import {
//   getAllQuestions,
//   addQuestion,
//   deleteQuestion,
//   updateQuestion,
//   getQuestionById
// } from "../../controllers/admin/addQuestion.controller.js";

// import authMiddleware from "../../middleware/auth.middleware.js";
// import { adminOnly } from "../../middleware/adminOnly.js";

// const router = express.Router();

// // -------- Get all questions --------
// router.get("/", authMiddleware, adminOnly, getAllQuestions);

// // -------- Get single question --------
// router.get("/:id", authMiddleware, adminOnly, getQuestionById);

// // -------- Add question --------
// router.post("/add", authMiddleware, adminOnly, addQuestion);

// // -------- Update question --------
// router.put("/:id", authMiddleware, adminOnly, updateQuestion);

// // -------- Delete question --------
// router.delete("/:id", authMiddleware, adminOnly, deleteQuestion);

// export default router;





import express from "express";
import {
  getAllQuestions,
  getQuestionById,
  addQuestion,
  updateQuestion,
  deleteQuestion
} from "../../controllers/admin/addQuestion.controller.js";

import authMiddleware from "../../middleware/auth.middleware.js";
import { allRolesAllowed } from "../../middleware/adminOnly.js";

const router = express.Router();

// -----------------------------
// GET ALL QUESTIONS
// -----------------------------
router.get("/", authMiddleware, allRolesAllowed, getAllQuestions);

// -----------------------------
// GET SINGLE QUESTION
// -----------------------------
router.get("/:id", authMiddleware, allRolesAllowed, getQuestionById);

// -----------------------------
// ADD QUESTION → ADMIN, SUBJECT, EXAMINATION
// -----------------------------
router.post("/add", authMiddleware, allRolesAllowed, addQuestion);

// -----------------------------
// UPDATE QUESTION → ADMIN, SUBJECT, EXAMINATION
// -----------------------------
router.put("/:id", authMiddleware, allRolesAllowed, updateQuestion);

// -----------------------------
// DELETE QUESTION → ADMIN, SUBJECT, EXAMINATION
// -----------------------------
router.delete("/:id", authMiddleware, allRolesAllowed, deleteQuestion);

export default router;
