// import { User, Exam, Attempt } from "../models/index.js";
// import { Op } from "sequelize";

// export const getStudentDashboard = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     // 1️⃣ User info
//     const user = await User.findByPk(userId, {
//       attributes: ["name", "email"]
//     });

//     // 2️⃣ Get all subjects (exam titles)
//     const subjects = await Exam.findAll({
//       attributes: ["id", "title", "level_number"],
//       order: [["level_number", "ASC"]]
//     });

//     // 3️⃣ Latest attempts per subject
//     const attempts = await Attempt.findAll({
//       where: { user_id: userId, status: "SUBMITTED" },
//       include: [{ model: Exam, attributes: ["title", "level_number"] }],
//       order: [["submitted_at", "DESC"]]
//     });

//     // Group latest marks per subject
//     const subjectScores = {};
//     const levelScores = {};

//     attempts.forEach((a) => {
//       const subject = a.Exam.title;

//       // save only first latest
//       if (!subjectScores[subject]) {
//         subjectScores[subject] = a.score;
//       }

//       // save level-wise
//       levelScores[a.Exam.level_number] = a.score;
//     });

//     // 4️⃣ Determine next pending level (1-5)
//     const pendingLevels = {};

//     subjects.forEach((sub) => {
//       const lastLevel = attempts
//         .filter(a => a.Exam.title === sub.title)
//         .map(a => a.Exam.level_number)
//         .sort((a, b) => b - a)[0] || 0;

//       pendingLevels[sub.title] = lastLevel + 1 > 5 ? "COMPLETED" : lastLevel + 1;
//     });

//     res.json({
//       user,
//       subjects: subjects.map(s => s.title),
//       pendingLevels,
//       subjectScores,      // Pie chart data
//       levelScores         // Bar graph data
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Dashboard load error" });
//   }
// };




// import { User, Exam, Attempt } from "../models/index.js";
// import { Op } from "sequelize";

// export const getStudentDashboard = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     // 1️⃣ User info
//     const user = await User.findByPk(userId, {
//       attributes: ["name", "email"]
//     });

//     // 2️⃣ Get all subjects
//     const subjectsRaw = await Exam.findAll({
//       attributes: ["subject"], // use 'subject' not 'title'
//       group: ["subject"]
//     });
//     const subjects = subjectsRaw.map(s => s.subject);

//     // 3️⃣ Latest attempts per subject
//     const attempts = await Attempt.findAll({
//       where: { user_id: userId, status: "SUBMITTED" },
//       include: [{ model: Exam, attributes: ["subject", "level_number"] }],
//       order: [["submitted_at", "DESC"]]
//     });

//     // Group latest marks per subject
//     const subjectScores = {}; // pie chart
//     const levelScores = {};   // bar chart

//     attempts.forEach(a => {
//       const subject = a.Exam.subject;

//       // save only first/latest score per subject
//       if (!subjectScores[subject]) {
//         subjectScores[subject] = a.score;
//       }

//       // save score per level_number
//       levelScores[a.Exam.level_number] = a.score;
//     });

//     // 4️⃣ Determine next pending level (1–5)
//     const pendingLevels = {};

//     subjects.forEach(sub => {
//       const lastLevel = attempts
//         .filter(a => a.Exam.subject === sub)
//         .map(a => a.Exam.level_number)
//         .sort((a, b) => b - a)[0] || 0;

//       pendingLevels[sub] = lastLevel + 1 > 5 ? "COMPLETED" : lastLevel + 1;
//     });

//     res.json({
//       user,
//       subjects,
//       pendingLevels,
//       subjectScores,
//       levelScores
//     });

//   } catch (err) {
//     console.error("Dashboard load error:", err);
//     res.status(500).json({ message: "Dashboard load error" });
//   }
// };








// import { User, Exam, Attempt } from "../models/index.js";
// import { Op } from "sequelize";

// export const getStudentDashboard = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     // 1️⃣ User info
//     const user = await User.findByPk(userId, {
//       attributes: ["name", "email"]
//     });

//     // 2️⃣ Get all subjects
//     const subjectsRaw = await Exam.findAll({
//       attributes: ["subject"], // use 'subject' not 'title'
//       group: ["subject"]
//     });
//     const subjects = subjectsRaw.map(s => s.subject);

//     // 3️⃣ Latest attempts per subject
//     const attempts = await Attempt.findAll({
//       where: { user_id: userId, status: "SUBMITTED" },
//       include: [{ model: Exam, attributes: ["subject", "level_number"] }],
//       order: [["submitted_at", "DESC"]]
//     });

//     // Group latest marks per subject
//     const subjectScores = {}; // pie chart
//     const levelScores = {};   // bar chart

//     attempts.forEach(a => {
//       const subject = a.Exam.subject;

//       // save only first/latest score per subject
//       if (!subjectScores[subject]) {
//         subjectScores[subject] = a.score;
//       }

//       // save score per level_number
//       levelScores[a.Exam.level_number] = a.score;
//     });

//     // 4️⃣ Determine next pending level (1–5)
//     const pendingLevels = {};

//     subjects.forEach(sub => {
//       const lastLevel = attempts
//         .filter(a => a.Exam.subject === sub)
//         .map(a => a.Exam.level_number)
//         .sort((a, b) => b - a)[0] || 0;

//       pendingLevels[sub] = lastLevel + 1 > 5 ? "COMPLETED" : lastLevel + 1;
//     });

//     res.json({
//       user,
//       subjects,
//       pendingLevels,
//       subjectScores,
//       levelScores
//     });

//   } catch (err) {
//     console.error("Dashboard load error:", err);
//     res.status(500).json({ message: "Dashboard load error" });
//   }
// };














// import { User, Exam, Attempt } from "../models/index.js";
// import { Op } from "sequelize";

// export const getStudentDashboard = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     // 1️⃣ User Info
//     const user = await User.findByPk(userId, {
//       attributes: ["name", "email"]
//     });

//     // 2️⃣ Get All Subjects from Exam table
//     const subjectsRaw = await Exam.findAll({
//       attributes: ["subject"],
//       group: ["subject"]
//     });
//     const subjects = subjectsRaw.map(s => s.subject);

//     // 3️⃣ Attempts with Exam join
//     // const attempts = await Attempt.findAll({
//     //   where: { user_id: userId, status: "SUBMITTED" },
//     //   include: [{ model: Exam, attributes: ["subject", "level_number"] }],
//     //   order: [["submitted_at", "DESC"]]
//     // });

// // const attempts = await Attempt.findAll({
// //   where: {
// //     user_id: userId,
// //     status: "SUBMITTED"
// //   },
// //   include: [
// //     {
// //       model: Exam,
// //       attributes: ["id", "subject", "level_number"],
// //       required: true
      
// //     }
// //   ]
// // });

// const attempts.forEach(a => {
//   if (!a.Exam) return;

//   const subject = a.Exam.subject;
//   const level = a.Exam.level_number;
//   const score = a.score;

//   // Initialize if not exist
//   if (!subjectScores[subject]) subjectScores[subject] = 0;
//   if (!levelScores[subject]) levelScores[subject] = {};

//   // Add level-wise score
//   levelScores[subject][level] = score;

//   // Subject total = sum of all levels
//   subjectScores[subject] = Object.values(levelScores[subject])
//     .reduce((a, b) => a + b, 0);
// });



//     console.log("ATTEMPTS:", attempts.map(a => ({
//   exam_id: a.exam_id,
//   score: a.score,
//   status: a.status,
//   hasExam: !!a.Exam
// })));


//     // Score objects
//     const subjectScores = {};
//     const levelScores = {};

//     attempts.forEach(a => {
//       // SKIP IF EXAM MISSING ❗
//       if (!a.Exam) return;

//       const subject = a.Exam.subject;

//       // Latest score for subject
//       if (!subjectScores[subject]) {
//         subjectScores[subject] = a.score;
//       }

//       // Score per level
//       levelScores[a.Exam.level_number] = a.score;
//     });

//     // 4️⃣ Pending Levels per subject
//     const pendingLevels = {};

//     subjects.forEach(sub => {
//       // FIND attempts with same subject
//       const levels = attempts
//         .filter(a => a.Exam && a.Exam.subject === sub)
//         .map(a => a.Exam.level_number);

//       const lastLevel = levels.sort((a, b) => b - a)[0] || 0;

//       pendingLevels[sub] = lastLevel + 1 > 5 ? "COMPLETED" : lastLevel + 1;
//     });

//     // RESPONSE
//     res.json({
//       user,
//       subjects,
//       pendingLevels,
//       subjectScores,
//       levelScores
//     });

//   } catch (err) {
//     console.error("Dashboard load error:", err);
//     res.status(500).json({ message: "Dashboard load error" });
//   }
// };




// import { User, Exam, Attempt } from "../models/index.js";
// import { Op } from "sequelize";
// // import { User, Exam, Attempt } from "../models/index.js";

// export const getStudentDashboard = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     // 1️⃣ User Info
//     const user = await User.findByPk(userId, {
//       attributes: ["name", "email"]
//     });

//     // 2️⃣ Get All Subjects from Exam table
//     const subjectsRaw = await Exam.findAll({
//       attributes: ["subject"],
//       group: ["subject"]
//     });
//     const subjects = subjectsRaw.map(s => s.subject);

//     // 3️⃣ Attempts with Exam join
//     // const attempts = await Attempt.findAll({
//     //   where: { user_id: userId, status: "SUBMITTED" },
//     //   include: [
//     //     {
//     //       model: Exam,
//     //       attributes: ["id", "subject", "level_number"],
//     //       required: true
//     //     }
//     //   ],
//     //   order: [["submitted_at", "ASC"]]
//     // });


//  const attempts = await Attempt.findAll({
//   where: { user_id: userId, status: "SUBMITTED" },
//   include: [
//     {
//       model: Exam,
//       as: "Exam",        // must match belongsTo alias in index.js
//       attributes: ["id", "subject", "level_number"],
//       required: true
//     }
//   ],
//   order: [["submitted_at", "ASC"]]
// });


// console.log(attempts.map(a => ({
//   exam_id: a.exam_id,
//   score: a.score,
//   status: a.status,
//   exam_subject: a.Exam ? a.Exam.subject : null
// })));



//     // 4️⃣ Initialize score objects
//     const subjectScores = {};
//     const levelScores = {};

//     // 5️⃣ Populate scores
//     attempts.forEach(a => {
//       if (!a.Exam) return;

//       const subject = a.Exam.subject;
//       const level = a.Exam.level_number;
//       const score = a.score;

//       // Initialize if not exist
//       if (!subjectScores[subject]) subjectScores[subject] = 0;
//       if (!levelScores[subject]) levelScores[subject] = {};

//       // Save level-wise score
//       levelScores[subject][level] = score;

//       // Subject total = sum of all level scores
//       subjectScores[subject] = Object.values(levelScores[subject])
//         .reduce((acc, curr) => acc + curr, 0);
//     });

//     // 6️⃣ Calculate pending levels
//     const pendingLevels = {};
//     subjects.forEach(sub => {
//       const levels = Object.keys(levelScores[sub] || {}).map(Number);
//       const lastLevel = levels.length ? Math.max(...levels) : 0;
//       pendingLevels[sub] = lastLevel + 1 > 5 ? "COMPLETED" : lastLevel + 1;
//     });

//     // 7️⃣ Response
//     res.json({
//       user,
//       subjects,
//       pendingLevels,
//       subjectScores,
//       levelScores
//     });

//   } catch (err) {
//     console.error("Dashboard load error:", err);
//     res.status(500).json({ message: "Dashboard load error" });
//   }
// };






// import { User, Exam, Attempt } from "../models/index.js";

// export const getStudentDashboard = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     // 1️⃣ User Info
//     const user = await User.findByPk(userId, {
//       attributes: ["name", "email"]
//     });

//     // 2️⃣ Get all subjects
//     const subjectsRaw = await Exam.findAll({
//       attributes: ["subject"],
//       group: ["subject"]
//     });
//     const subjects = subjectsRaw.map(s => s.subject);

//     // 3️⃣ Fetch attempts with Exam join
//     const attempts = await Attempt.findAll({
//       where: { user_id: userId, status: "SUBMITTED" },
//       include: [
//         {
//           model: Exam,
//           as: "Exam", // ✅ matches alias in association
//           attributes: ["id", "subject", "level_number"],
//           required: true
//         }
//       ],
//       order: [["submitted_at", "ASC"]]
//     });

//     console.log("ATTEMPTS:", attempts.map(a => ({
//       exam_id: a.exam_id,
//       score: a.score,
//       status: a.status,
//       exam_subject: a.Exam ? a.Exam.subject : null
//     })));

//     // 4️⃣ Initialize score objects
//     const subjectScores = {};
//     const levelScores = {};

//     // 5️⃣ Populate scores
//     attempts.forEach(a => {
//       if (!a.Exam) return;

//       const subject = a.Exam.subject;
//       const level = a.Exam.level_number;
//       const score = parseFloat(a.score);

//       if (!subjectScores[subject]) subjectScores[subject] = 0;
//       if (!levelScores[subject]) levelScores[subject] = {};

//       levelScores[subject][level] = score;

//       // Sum all level scores for the subject
//       subjectScores[subject] = Object.values(levelScores[subject])
//         .reduce((acc, curr) => acc + curr, 0);
//     });

//     // 6️⃣ Pending levels calculation
//     const pendingLevels = {};
//     subjects.forEach(sub => {
//       const levels = Object.keys(levelScores[sub] || {}).map(Number);
//       const lastLevel = levels.length ? Math.max(...levels) : 0;
//       pendingLevels[sub] = lastLevel + 1 > 5 ? "COMPLETED" : lastLevel + 1;
//     });

//     // 7️⃣ Send JSON response
//     res.json({
//       user,
//       subjects,
//       pendingLevels,
//       subjectScores,
//       levelScores
//     });

//   } catch (err) {
//     console.error("Dashboard load error:", err);
//     res.status(500).json({ message: "Dashboard load error" });
//   }
// };







import { User, Exam, Attempt } from "../models/index.js";

export const getStudentDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1️⃣ User Info
    const user = await User.findByPk(userId, {
      attributes: ["name", "email"]
    });

    // 2️⃣ Get all subjects
    const subjectsRaw = await Exam.findAll({
      attributes: ["subject"],
      group: ["subject"]
    });
    const subjects = subjectsRaw.map(s => s.subject);

    // 3️⃣ Fetch attempts with Exam join
    const attempts = await Attempt.findAll({
      where: { user_id: userId, status: "SUBMITTED" },
      include: [
        {
          model: Exam,
          as: "Exam", // must match alias in association
          attributes: ["id", "subject", "level_number", "total_marks"],
          required: true
        }
      ],
      order: [["submitted_at", "ASC"]]
    });

    // 4️⃣ Initialize score objects
    const subjectScores = {};
    const levelScores = {};

    // 5️⃣ Populate scores
    attempts.forEach(a => {
      if (!a.Exam) return;

      const subject = a.Exam.subject;
      const level = a.Exam.level_number;
      const score = parseFloat(a.score);

      if (!levelScores[subject]) levelScores[subject] = {};
      levelScores[subject][level] = score;

      // Latest level score becomes subject score
      subjectScores[subject] = score;
    });

    // 6️⃣ Pending levels calculation
    const pendingLevels = {};
    subjects.forEach(sub => {
      const levels = Object.keys(levelScores[sub] || {}).map(Number);
      const lastLevel = levels.length ? Math.max(...levels) : 0;
      pendingLevels[sub] = lastLevel + 1 > 5 ? "COMPLETED" : lastLevel + 1;
    });

    // 7️⃣ Send JSON response
    res.json({
      user,
      subjects,
      pendingLevels,
      subjectScores,
      levelScores
    });

  } catch (err) {
    console.error("Dashboard load error:", err);
    res.status(500).json({ message: "Dashboard load error" });
  }
};

