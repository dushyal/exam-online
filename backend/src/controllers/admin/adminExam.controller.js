// =============================
// ADMIN EXAM CONTROLLER
// =============================

import { Exam } from "../../models/index.js";

// GET ALL EXAMS
export const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.findAll({
      order: [["id", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      exams,
    });
  } catch (error) {
    console.error("Error in getAllExams:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load exams",
    });
  }
};
