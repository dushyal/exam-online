// import express from "express";
// import { Exam } from "../../models/index.js";
// import { adminOnly } from "../../middleware/adminOnly.js";

// const router = express.Router();

// // ---------------- CREATE EXAM ----------------
// router.post("/create", adminOnly, async (req, res) => {
//   try {
//     const exam = await Exam.create({
//       ...req.body,
//       created_by: req.admin.id,
//     });

//     res.json({ message: "Exam created", exam });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // ---------------- GET ALL EXAMS ----------------
// router.get("/", adminOnly, async (req, res) => {
//   const exams = await Exam.findAll({ order: [["id", "DESC"]] });
//   res.json(exams);
// });

// // ---------------- UPDATE EXAM ----------------
// router.put("/:id", adminOnly, async (req, res) => {
//   await Exam.update(req.body, { where: { id: req.params.id } });
//   res.json({ message: "Exam updated" });
// });

// // ---------------- DELETE EXAM ----------------
// router.delete("/:id", adminOnly, async (req, res) => {
//   await Exam.destroy({ where: { id: req.params.id } });
//   res.json({ message: "Exam deleted" });
// });

// export default router;




// import express from "express";
// import { Exam } from "../../models/index.js";
// import { adminOnly } from "../../middleware/adminOnly.js";

// const router = express.Router();

// // ---------------- CREATE EXAM ----------------
// router.post("/create", adminOnly, async (req, res) => {
//   try {
//     const exam = await Exam.create({
//       ...req.body,
//       created_by: req.admin.id,
//     });

//     res.json({ success: true, message: "Exam created", exam });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // ---------------- GET ALL EXAMS ----------------
// router.get("/", adminOnly, async (req, res) => {
//   try {
//     const exams = await Exam.findAll({ order: [["id", "DESC"]] });

//     res.json({
//       success: true,
//       exams,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // ---------------- UPDATE EXAM ----------------
// router.put("/:id", adminOnly, async (req, res) => {
//   await Exam.update(req.body, { where: { id: req.params.id } });
//   res.json({ success: true, message: "Exam updated" });
// });

// // ---------------- DELETE EXAM ----------------
// router.delete("/:id", adminOnly, async (req, res) => {
//   await Exam.destroy({ where: { id: req.params.id } });
//   res.json({ success: true, message: "Exam deleted" });
// });

// export default router;






// import express from "express";
// import { Exam } from "../../models/index.js";
// import authMiddleware from "../../middleware/auth.Middleware.js";
// import { adminOnly } from "../../middleware/adminOnly.js";

// const router = express.Router();

// // CREATE EXAM
// router.post("/create", authMiddleware, adminOnly, async (req, res) => {
//   try {
//     const exam = await Exam.create({
//       ...req.body,
//       created_by: req.user.id, // use req.user, not req.admin
//     });

//     res.json({ success: true, message: "Exam created", exam });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // GET ALL EXAMS
// router.get("/", authMiddleware, adminOnly, async (req, res) => {
//   try {
//     const exams = await Exam.findAll({ order: [["id", "DESC"]] });

//     res.json({
//       success: true,
//       exams,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // UPDATE
// router.put("/:id", authMiddleware, adminOnly, async (req, res) => {
//   await Exam.update(req.body, { where: { id: req.params.id } });
//   res.json({ success: true, message: "Exam updated" });
// });

// // DELETE
// router.delete("/:id", authMiddleware, adminOnly, async (req, res) => {
//   await Exam.destroy({ where: { id: req.params.id } });
//   res.json({ success: true, message: "Exam deleted" });
// });

// export default router;






// import express from "express";
// import { Exam } from "../../models/index.js";
// import authMiddleware from "../../middleware/auth.Middleware.js";
// import { adminOnly } from "../../middleware/adminOnly.js";

// const router = express.Router();

// // CREATE EXAM
// router.post("/create", authMiddleware, adminOnly, async (req, res) => {
//   try {
//     const {
//       name,
//       subject,
//       level,
//       totalQuestions,
//       totalMarks,
//       passingMarks,
//       duration,
//       selectedQuestions,
//       mode,
//     } = req.body;

//     // Map frontend fields to Exam model
//     const exam = await Exam.create({
//       title: name,
//       subject,
//       level_number: Number(level) || 0,
//       duration_minutes: Number(duration) || 20,
//       total_marks: Number(totalMarks) || 0,
//       passing_percent: Number(passingMarks) || 0,
//       max_attempts: 1,
//       created_by: req.user.id,
//       selected_questions: JSON.stringify(selectedQuestions || []),
//       mode: mode || "manual",
//     });

//     res.json({ success: true, message: "Exam created", exam });
//   } catch (err) {
//     console.error("CREATE EXAM ERROR:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // GET ALL EXAMS
// router.get("/", authMiddleware, adminOnly, async (req, res) => {
//   try {
//     const exams = await Exam.findAll({ order: [["id", "DESC"]] });
//     res.json({ success: true, exams });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// export default router;


// import express from "express";
// import { Exam } from "../../models/index.js";
// import authMiddleware from "../../middleware/auth.Middleware.js";
// import { adminOnly } from "../../middleware/adminOnly.js";

// const router = express.Router();

// // CREATE EXAM
// // router.post("/create", authMiddleware, adminOnly, async (req, res) => {
// //   try {
// //     const {
// //       name,
// //       subject,
// //       level,
// //       totalQuestions,
// //       totalMarks,
// //       passingMarks,
// //       duration,
// //       selectedQuestions,
// //       mode,
// //     } = req.body;

// //     const exam = await Exam.create({
// //       title: name,
// //       subject,
// //       level_number: Number(level) || 0,
// //       duration_minutes: Number(duration) || 20,

// //       //  ✅ FIX — This was missing  
// //       total_questions: Number(totalQuestions) || selectedQuestions.length,

// //       total_marks: Number(totalMarks) || 0,
// //       passing_percent: Number(passingMarks) || 0,
// //       max_attempts: 1,
// //       created_by: req.user.id,
// //       selected_questions: JSON.stringify(selectedQuestions || []),
// //       mode: mode || "manual",
// //     });

// //     res.json({ success: true, message: "Exam created", exam });
// //   } catch (err) {
// //     console.error("CREATE EXAM ERROR:", err);
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // });

// // CREATE EXAM
// router.post("/create", authMiddleware, adminOnly, async (req, res) => {
//   try {
//     const {
//       name,
//       subject,
//       level,
//       totalQuestions,
//       totalMarks,
//       passingMarks,
//       duration,
//       selectedQuestions,
//       mode,
//       examStart,
//       examEnd
//     } = req.body;

//     const exam = await Exam.create({
//       title: name,
//       subject,
//       level_number: Number(level) || 0,
//       duration_minutes: Number(duration) || 20,
//       total_marks: Number(totalMarks) || 0,
//       passing_percent: Number(passingMarks) || 0,
//       total_questions: Number(totalQuestions) || 0,   // ⭐ FIXED
//       exam_start_datetime: examStart ? new Date(examStart) : null,
//       exam_end_datetime: examEnd ? new Date(examEnd) : null,
//       max_attempts: 1,
//       created_by: req.user.id,
//       selected_questions: JSON.stringify(selectedQuestions || []),
//       mode: mode || "manual",
//     });

//     res.json({ success: true, message: "Exam created", exam });
//   } catch (err) {
//     console.error("CREATE EXAM ERROR:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// });


// // GET ALL EXAMS
// router.get("/", authMiddleware, adminOnly, async (req, res) => {
//   try {
//     const exams = await Exam.findAll({ order: [["id", "DESC"]] });
//     res.json({ success: true, exams });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// export default router;



// import express from "express";
// import { Exam } from "../../models/index.js";
// import authMiddleware from "../../middleware/auth.Middleware.js";
// import { adminOnly } from "../../middleware/adminOnly.js";

// const router = express.Router();

// // CREATE EXAM
// router.post("/create", authMiddleware, adminOnly, async (req, res) => {
//   try {
//     const {
//       name,
//       subject,
//       level,
//       totalQuestions,
//       totalMarks,
//       passingMarks,
//       duration,
//       selectedQuestions,
//       mode,

//       // ✅ Correct keys coming from frontend
//       startDateTime,
//       endDateTime
//     } = req.body;

//     const exam = await Exam.create({
//       title: name,
//       subject,
//       level_number: Number(level) || 0,
//       duration_minutes: Number(duration) || 20,
//       total_marks: Number(totalMarks) || 0,
//       passing_percent: Number(passingMarks) || 0,
//       total_questions: Number(totalQuestions) || 0,

//       // ✅ Save to DB
//       exam_start: startDateTime ? new Date(startDateTime) : null,
//       exam_end: endDateTime ? new Date(endDateTime) : null,

//       max_attempts: 1,
//       created_by: req.user.id,
//       selected_questions: JSON.stringify(selectedQuestions || []),
//       mode: mode || "manual",
//     });

//     res.json({ success: true, message: "Exam created", exam });
//   } catch (err) {
//     console.error("CREATE EXAM ERROR:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // GET ALL EXAMS
// router.get("/", authMiddleware, adminOnly, async (req, res) => {
//   try {
//     const exams = await Exam.findAll({ order: [["id", "DESC"]] });
//     res.json({ success: true, exams });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// export default router;

import express from "express";
import { Exam } from "../../models/index.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import { adminOnly } from "../../middleware/adminOnly.js";

const router = express.Router();

// ============================
// CREATE EXAM
// ============================
router.post("/create", authMiddleware, adminOnly, async (req, res) => {
  try {
    const {
      name,
      subject,
      level,
      totalQuestions,
      totalMarks,
      passingMarks,
      duration,
      selectedQuestions,
      mode,
      startDateTime,
      endDateTime
    } = req.body;

    const exam = await Exam.create({
      title: name,
      subject,
      level_number: Number(level) || 0,
      duration_minutes: Number(duration) || 20,
      total_marks: Number(totalMarks) || 0,
      passing_percent: Number(passingMarks) || 0,
      total_questions: Number(totalQuestions) || 0,
      start_time: startDateTime ? new Date(startDateTime) : null,
      end_time: endDateTime ? new Date(endDateTime) : null,
      max_attempts: 1,
      created_by: req.user.id,
      selected_questions: JSON.stringify(selectedQuestions || []),
      mode: mode || "manual",
    });

    res.json({ success: true, message: "Exam created successfully", exam });
  } catch (err) {
    console.error("CREATE EXAM ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ============================
// GET ALL EXAMS
// ============================
router.get("/", authMiddleware, adminOnly, async (req, res) => {
  try {
    const exams = await Exam.findAll({
      order: [["id", "DESC"]],
    });

    res.json({ success: true, exams });
  } catch (err) {
    console.error("FETCH EXAMS ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ============================
// DELETE EXAM
// ============================
router.delete("/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Exam.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Exam not found" });
    }

    res.json({ success: true, message: "Exam deleted successfully" });
  } catch (err) {
    console.error("DELETE EXAM ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});



// ============================
// GET SINGLE EXAM BY ID
// ============================
router.get("/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await Exam.findOne({ where: { id } });

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found"
      });
    }

    res.json({
      success: true,
      exam
    });

  } catch (err) {
    console.error("GET EXAM ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// ============================
// UPDATE EXAM
// ============================
router.put("/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      total_marks,
      passing_percent,
      duration_minutes,
      start_time,
      end_time
    } = req.body;

    const exam = await Exam.findOne({ where: { id } });

    if (!exam) {
      return res.status(404).json({ success: false, message: "Exam not found" });
    }

    await exam.update({
      title: name,
      total_marks,
      passing_percent,
      duration_minutes,
      start_time: start_time ? new Date(start_time) : null,
      end_time: end_time ? new Date(end_time) : null,
    });

    res.json({ success: true, message: "Exam updated successfully", exam });

  } catch (err) {
    console.error("UPDATE EXAM ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});


export default router;
