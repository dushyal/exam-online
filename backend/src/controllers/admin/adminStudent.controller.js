import { User } from "../models/index.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await User.findAll({ where: { role: "student" } });
    res.json({ success: true, students });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

