import express from "express";
import { User } from "../../models/index.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import { adminOnly } from "../../middleware/adminOnly.js";

const router = express.Router();

// GET ALL STUDENTS
router.get("/", authMiddleware, adminOnly, async (req, res) => {
  try {
    const students = await User.findAll({ where: { role: "student" } });
    res.json({ success: true, students });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// BLOCK / UNBLOCK
router.put("/:id/block", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { block } = req.body;
    const student = await User.findOne({ where: { id, role: "student" } });
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });
    await student.update({ blocked: block });
    res.json({ success: true, student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// UPDATE STUDENT
router.put("/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const student = await User.findOne({ where: { id, role: "student" } });
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });
    await student.update({ name, email });
    res.json({ success: true, student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE STUDENT
router.delete("/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id, role: "student" } });
    if (!deleted) return res.status(404).json({ success: false, message: "Student not found" });
    res.json({ success: true, message: "Student deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
