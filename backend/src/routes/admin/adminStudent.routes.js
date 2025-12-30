import express from "express";
import { User } from "../../models/index.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import { adminOnly } from "../../middleware/adminOnly.js";

const router = express.Router();

// =======================
// GET ALL STUDENTS
// =======================
router.get("/", authMiddleware, adminOnly, async (req, res) => {
  try {
    const rawStudents = await User.findAll({
      // where: { role: "CANDIDATE" }
    });

    // Convert DB fields to frontend expected fields
    const students = rawStudents.map(s => ({
      ...s.dataValues,
      blocked: s.is_blocked   // convert to frontend name
    }));

    res.json({ success: true, students });
  } catch (err) {
    console.error("GET STUDENTS ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// =======================
// BLOCK / UNBLOCK STUDENT
// =======================
router.put("/:id/block", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { block } = req.body; // boolean

    const student = await User.findOne({ where: { id, role: "CANDIDATE" } });
    if (!student)
      return res.status(404).json({ success: false, message: "Student not found" });

    await student.update({ is_blocked: block });

    const updated = {
      ...student.dataValues,
      blocked: student.is_blocked
    };

    res.json({ success: true, student: updated });
  } catch (err) {
    console.error("BLOCK ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// =======================
// UPDATE STUDENT
// =======================
router.put("/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const student = await User.findOne({ where: { id, role: "CANDIDATE" } });
    if (!student)
      return res.status(404).json({ success: false, message: "Student not found" });

    await student.update({ name, email });

    const updated = {
      ...student.dataValues,
      blocked: student.is_blocked
    };

    res.json({ success: true, student: updated });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// =======================
// DELETE STUDENT
// =======================
router.delete("/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await User.destroy({ where: { id, role: "CANDIDATE" } });
    if (!deleted)
      return res.status(404).json({ success: false, message: "Student not found" });

    res.json({ success: true, message: "Student deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
