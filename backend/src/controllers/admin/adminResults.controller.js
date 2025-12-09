import { Attempt } from "../../models/attempt.model.js";
import { User } from "../../models/user.model.js";
import { Exam } from "../../models/exam.model.js";

// ===============================
// GET ALL RESULTS (ADMIN PANEL)
// ===============================
export const getAllResults = async (req, res) => {
  try {
    const results = await Attempt.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"]
        },
        {
          model: Exam,
          attributes: ["id", "subject", "level_number","title"]  // FIXED
        }
      ],
      order: [["submitted_at", "DESC"]],
    });

    return res.json({ success: true, results });
  } catch (err) {
    console.error("Admin Results Fetch Error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
