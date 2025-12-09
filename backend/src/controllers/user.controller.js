import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { EventLog } from "../models/EventLog.js";

// =============================
// REGISTER USER
// =============================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password_hash: hashedPassword,
      role: role || "CANDIDATE",
    });

    await EventLog.create({
      user_id: user.id,
      event_type: "REGISTER",
      description: `User ${user.name} registered.`,
    });

    return res.json({ message: "Registration successful", user });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// =============================
// LOGIN USER
// =============================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid password" });

    if (user.is_blocked)
      return res.status(403).json({ error: "Account is blocked" });

    await EventLog.create({
      user_id: user.id,
      event_type: "LOGIN",
      description: `${user.name} logged in.`,
    });

    return res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// =============================
// GET USER PROFILE
// =============================
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user)
      return res.status(404).json({ error: "User not found" });

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};


// Dashbord Profile

export const getUserProfileDash = async (req, res) => {
  try {
    const user = req.user; // Loaded from authMiddleware

    if (!user)
      return res.status(404).json({ error: "User not found" });

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};


// =============================
// BLOCK / UNBLOCK USER
// =============================
export const toggleBlockUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user)
      return res.status(404).json({ error: "User not found" });

    user.is_blocked = !user.is_blocked;
    await user.save();

    return res.json({
      message: `User ${user.is_blocked ? "blocked" : "unblocked"} successfully`,
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

// =============================
// DELETE USER
// =============================
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });

    if (!deleted)
      return res.status(404).json({ error: "User not found" });

    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};
