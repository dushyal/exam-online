import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { OtpVerification } from "../models/otpVerification.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// --------------- EMAIL TRANSPORT ------------------
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ============= 1️⃣ REGISTER INIT — SEND OTP ==================
router.post("/register-init", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields required" });

    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ error: "Email already registered" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 5 * 60000);

    await OtpVerification.create({
      email,
      otp_code: otp,
      expires_at: expires,
      verified: false,
      name,
      password, // store temporarily
    });

    await transporter.sendMail({
   from: `"Online Exam System (OES)" <${process.env.EMAIL_USER}>`,
   to: email,
   subject: 'OES : Your OTP Code',
   html: `
     <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; border-radius: 10px; border: 1px solid #e0e0e0; max-width: 500px; margin: auto;">
       <h2 style="text-align: center; color: #1a73e8;">Online Exam System (OES)</h2>
       <p>Hello, D:\Online-Exam-System-01\backend\src\controllers\auth.controller.js</p>
       <p>Your One-Time Password (OTP) for verifying your account is:</p>
       <div style="text-align: center; margin: 20px 0;">
         <span style="font-size: 24px; font-weight: bold; color: #1a73e8; letter-spacing: 2px;">${otp}</span>
       </div>
       <p>This OTP is valid for <strong>5 minutes</strong>. Please do not share this code with anyone.</p>
       <p>If you did not request this OTP, please ignore this email.</p>
       <br>
       <p>Thank you,<br><strong>Online Exam System (OES)</strong></p>
       <hr style="margin-top: 20px;">
       <footer style="text-align: center; font-size: 12px; color: #888;">
         © 2025 Online Exam System | All rights reserved
       </footer>
     </div>
   `
 });


    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// ============= 2️⃣ REGISTER COMPLETE — VERIFY + CREATE USER ==================
router.post("/register-complete", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await OtpVerification.findOne({
      where: { email, otp_code: otp },
      order: [["id", "DESC"]],
    });

    if (!record) return res.status(400).json({ error: "Invalid OTP" });
    if (record.expires_at < new Date())
      return res.status(400).json({ error: "OTP expired" });

    // Create actual user
    const hashedPassword = await bcrypt.hash(record.password, 10);
    const newUser = await User.create({
      name: record.name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Mark OTP as used
    record.verified = true;
    await record.save();

    res.json({ message: "Registration complete", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
});


// ============= 3️⃣ RESEND OTP ==================
router.post("/resend", async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 5 * 60000);

    // Delete previous OTPs for this email
    await OtpVerification.destroy({ where: { email } });

    // Save new OTP
    await OtpVerification.create({
      email,
      otp_code: otp,
      expires_at: expires,
      verified: false,
      name: name || "User",
    });

    // Send OTP email
    await transporter.sendMail({
   from: `"Online Exam System (OES)" <${process.env.EMAIL_USER}>`,
   to: email,
   subject: 'OES : Your OTP Code',
   html: `
     <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; border-radius: 10px; border: 1px solid #e0e0e0; max-width: 500px; margin: auto;">
       <h2 style="text-align: center; color: #1a73e8;">Online Exam System (OES)</h2>
       <p>Hello, D:\Online-Exam-System-01\backend\src\controllers\auth.controller.js</p>
       <p>Your One-Time Password (OTP) for verifying your account is:</p>
       <div style="text-align: center; margin: 20px 0;">
         <span style="font-size: 24px; font-weight: bold; color: #1a73e8; letter-spacing: 2px;">${otp}</span>
       </div>
       <p>This OTP is valid for <strong>5 minutes</strong>. Please do not share this code with anyone.</p>
       <p>If you did not request this OTP, please ignore this email.</p>
       <br>
       <p>Thank you,<br><strong>Online Exam System (OES)</strong></p>
       <hr style="margin-top: 20px;">
       <footer style="text-align: center; font-size: 12px; color: #888;">
         © 2025 Online Exam System | All rights reserved
       </footer>
     </div>
   `
 });


    res.json({ message: "✅ OTP resent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to resend OTP" });
  }
});

// ============= 4️⃣ LOGIN ==================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email & password required" });

    // Check user
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    // Compare passwords
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    // Create token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Save Login Event
    await EventLog.create({
      user_id: user.id,
      event_type: "LOGIN",
      description: `User ${user.email} logged in`
    });

    // Send success
    return res.json({
      message: "Login success",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" });
  }
});


export default router;
