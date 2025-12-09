// import { User, Exam, Attempt } from "../models/index.js";

// export const getSubjectDetails = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { subject } = req.params;

//     // 1️⃣ Check if subject exists
//     const subjectExists = await Exam.findOne({
//       where: { subject },
//     });

//     if (!subjectExists)
//       return res.status(404).json({ message: "Subject not found" });

//     // 2️⃣ Get all attempts for that subject
//     const attempts = await Attempt.findAll({
//       where: { user_id: userId, status: "SUBMITTED" },
//       include: [
//         {
//           model: Exam,
//           as: "Exam",
//           attributes: ["id", "subject", "level_number", "total_marks"],
//           where: { subject },
//           required: true,
//         },
//       ],
//       order: [["submitted_at", "ASC"]],
//     });

//     // 3️⃣ Level scores
//     const levelScores = {};
//     attempts.forEach(a => {
//       const lvl = a.Exam.level_number;
//       const score = parseFloat(a.score);
//       levelScores[lvl] = score;
//     });

//     // 4️⃣ Latest score (max level)
//     const latestLevel = Object.keys(levelScores).length
//       ? Math.max(...Object.keys(levelScores).map(Number))
//       : 0;

//     const latestScore = latestLevel ? levelScores[latestLevel] : 0;

//     // 5️⃣ Pending level (unlock logic)
//     let pendingLevel = latestLevel + 1;
//     if (pendingLevel > 5) pendingLevel = "COMPLETED";

//     // 6️⃣ Prepare lock/unlock for UI
//     const levels = [];

//     for (let lvl = 1; lvl <= 5; lvl++) {
//       levels.push({
//         level: lvl,
//         score: levelScores[lvl] || null,
//         locked: lvl > latestLevel + 1, // only next level unlocked
//       });
//     }

//     res.json({
//       subject,
//       latestScore,
//       pendingLevel,
//       levels,
//     });

//   } catch (err) {
//     console.error("Subject details error:", err);
//     res.status(500).json({ message: "Subject details error" });
//   }
// };







// import { Exam, Attempt } from "../models/index.js";

// export const getSubjectDetails = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const subject = req.params.subjectName;

//     // 1️⃣ Get all levels for this subject (static 1-5)
//     const levels = [1, 2, 3, 4, 5];

//     // 2️⃣ Fetch all attempts of this user for given subject
//     const attempts = await Attempt.findAll({
//       where: { user_id: userId, status: "SUBMITTED" },
//       include: [
//         {
//           model: Exam,
//           as: "Exam",
//           attributes: ["subject", "level_number"]
//         }
//       ]
//     });

//     // Score storage
//     const levelScoreMap = {};

//     attempts.forEach((a) => {
//       if (a.Exam.subject === subject) {
//         levelScoreMap[a.Exam.level_number] = parseFloat(a.score);
//       }
//     });

//     // 3️⃣ Build response with unlock logic

//     let isPreviousUnlocked = true;

//     const levelData = levels.map((lvl) => {
//       const score = levelScoreMap[lvl] || null;

//       const isUnlocked = isPreviousUnlocked;

//       // If this level has no score → next will be locked
//       if (!score) isPreviousUnlocked = false;

//       return {
//         level: lvl,
//         score,
//         isUnlocked,
//       };
//     });

//     res.json({
//       subject,
//       levels: levelData
//     });

//   } catch (err) {
//     console.error("Subject Page Error:", err);
//     res.status(500).json({ message: "Subject data fetch failed" });
//   }
// };


// import { User, Exam, Attempt } from "../models/index.js";

// export const getSubjectDetails = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { subject } = req.params;

//     // 1️⃣ Check if subject exists
//     const subjectExists = await Exam.findOne({
//       where: { subject },
//     });

//     if (!subjectExists)
//       return res.status(404).json({ message: "Subject not found" });

//     // 2️⃣ Get all attempts for that subject
//     const attempts = await Attempt.findAll({
//       where: { user_id: userId, status: "SUBMITTED" },
//       include: [
//         {
//           model: Exam,
//           as: "Exam",
//           attributes: ["id", "subject", "level_number", "total_marks"],
//           where: { subject },
//           required: true,
//         },
//       ],
//       order: [["submitted_at", "ASC"]],
//     });

//     // 3️⃣ Level scores
//     const levelScores = {};
//     attempts.forEach(a => {
//       const lvl = a.Exam.level_number;
//       const score = parseFloat(a.score);
//       levelScores[lvl] = score;
//     });

//     // 4️⃣ Latest score (max level)
//     const latestLevel = Object.keys(levelScores).length
//       ? Math.max(...Object.keys(levelScores).map(Number))
//       : 0;

//     const latestScore = latestLevel ? levelScores[latestLevel] : 0;

//     // 5️⃣ Pending level (unlock logic)
//     let pendingLevel = latestLevel + 1;
//     if (pendingLevel > 5) pendingLevel = "COMPLETED";

//     // 6️⃣ Prepare lock/unlock for UI
//     const levels = [];

//     for (let lvl = 1; lvl <= 5; lvl++) {
//       levels.push({
//         level: lvl,
//         score: levelScores[lvl] || null,
//         locked: lvl > latestLevel + 1, // only next level unlocked
//       });
//     }

//     res.json({
//       subject,
//       latestScore,
//       pendingLevel,
//       levels,
//     });

//   } catch (err) {
//     console.error("Subject details error:", err);
//     res.status(500).json({ message: "Subject details error" });
//   }
// };







import { Exam, Attempt } from "../models/index.js";

export const getSubjectDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const subject = req.params.subjectName;

    // 1️⃣ Get all levels for this subject (static 1-5)
    const levels = [1, 2, 3, 4, 5];

    // 2️⃣ Fetch all attempts of this user for given subject
    const attempts = await Attempt.findAll({
      where: { user_id: userId, status: "SUBMITTED" },
      include: [
        {
          model: Exam,
          as: "Exam",
          attributes: ["subject", "level_number"]
        }
      ]
    });
    
    // Score storage
    const levelScoreMap = {};

    attempts.forEach((a) => {
      if (a.Exam.subject === subject) {
        levelScoreMap[a.Exam.level_number] = parseFloat(a.score);
      }
    });

    // 3️⃣ Build response with unlock logic

    let isPreviousUnlocked = true;

    const levelData = levels.map((lvl) => {
      const score = levelScoreMap[lvl] || null;

      const isUnlocked = isPreviousUnlocked;

      // If this level has no score → next will be locked
      if (!score) isPreviousUnlocked = false;

      return {
        level: lvl,
        score,
        isUnlocked,
      };
    });

    res.json({
      subject,
      levels: levelData
    });

  } catch (err) {
    console.error("Subject Page Error:", err);
    res.status(500).json({ message: "Subject data fetch failed" });
  }
};
