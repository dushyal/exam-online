// import express from 'express';
// import { OtpVerification } from '../models/otpVerification.model.js';
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';


// dotenv.config();

// const router = express.Router();

// // ✅ Create Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   secure: false, // must be false for port 587
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// // Optional: verify connection

// transporter.verify((error, success) => {
//   if (error) {
//     console.error('❌ Email Transporter Error:', error);
//   } else {
//     console.log('✅ Mail server ready to send emails');
//   }
// });


// // 📤 SEND OTP

// router.post('/send', async (req, res) => {
//   try {
//     const { email } = req.body;


//     if (!email) return res.status(400).json({ error: 'Email is required' });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const expires = new Date(Date.now() + 5 * 60000); // 5 minutes from now

//     await OtpVerification.create({
//       email,
//       otp_code: otp,
//       expires_at: expires,
//       verified: false
//     });


//     await transporter.sendMail({
//   from: `"Online Exam System (OES)" <${process.env.EMAIL_USER}>`,
//   to: email,
//   subject: 'OES : Your OTP Code',
//   html: `
//     <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; border-radius: 10px; border: 1px solid #e0e0e0; max-width: 500px; margin: auto;">
//       <h2 style="text-align: center; color: #1a73e8;">Online Exam System (OES)</h2>
//       <p>Hello,</p>
//       <p>Your One-Time Password (OTP) for verifying your account is:</p>
//       <div style="text-align: center; margin: 20px 0;">
//         <span style="font-size: 24px; font-weight: bold; color: #1a73e8; letter-spacing: 2px;">${otp}</span>
//       </div>
//       <p>This OTP is valid for <strong>5 minutes</strong>. Please do not share this code with anyone.</p>
//       <p>If you did not request this OTP, please ignore this email.</p>
//       <br>
//       <p>Thank you,<br><strong>Online Exam System (OES)</strong></p>
//       <hr style="margin-top: 20px;">
//       <footer style="text-align: center; font-size: 12px; color: #888;">
//         © 2025 Online Exam System | All rights reserved
//       </footer>
//     </div>
//   `
// });

//     res.json({ message: '✅ OTP sent successfully' });
//   } catch (error) {
//     console.error('❌ Error sending OTP:', error);
//     res.status(500).json({ error: 'Failed to send OTP' });
//   }
// });



// // 🔁 RESEND OTP
// router.post('/resend', async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email)
//       return res.status(400).json({ error: 'Email is required' });

//     // Generate new OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const expires = new Date(Date.now() + 5 * 60000); // 5 minutes

//     // Delete old OTPs (optional)
//     await OtpVerification.destroy({ where: { email } });

//     // Save new OTP record
//     await OtpVerification.create({
//       email,
//       otp_code: otp,
//       expires_at: expires,
//       verified: false,
//     });

//     // Send OTP email (no external function)
//        await transporter.sendMail({
//   from: `"Online Exam System (OES)" <${process.env.EMAIL_USER}>`,
//   to: email,
//   subject: 'OES : Your OTP Code',
//   html: `
//     <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; border-radius: 10px; border: 1px solid #e0e0e0; max-width: 500px; margin: auto;">
//       <h2 style="text-align: center; color: #1a73e8;">Online Exam System (OES)</h2>
//       <p>Hello,</p>
//       <p>Your One-Time Password (OTP) for verifying your account is:</p>
//       <div style="text-align: center; margin: 20px 0;">
//         <span style="font-size: 24px; font-weight: bold; color: #1a73e8; letter-spacing: 2px;">${otp}</span>
//       </div>
//       <p>This OTP is valid for <strong>5 minutes</strong>. Please do not share this code with anyone.</p>
//       <p>If you did not request this OTP, please ignore this email.</p>
//       <br>
//       <p>Thank you,<br><strong>Online Exam System (OES)</strong></p>
//       <hr style="margin-top: 20px;">
//       <footer style="text-align: center; font-size: 12px; color: #888;">
//         © 2025 Online Exam System | All rights reserved
//       </footer>
//     </div>
//   `
// });

//     res.json({ message: '✅ New OTP sent successfully' });
//   } catch (error) {
//     console.error('❌ Error resending OTP:', error);
//     res.status(500).json({ error: 'Failed to resend OTP' });
//   }
// });


// // ✅ VERIFY OTP

// router.post('/verify', async (req, res) => {
//   try {
//     const { email, otp, otp_code } = req.body;
//     const otpValue = otp_code || otp;

//     if (!email || !otpValue)
//       return res.status(400).json({ error: 'Email and OTP are required' });

//     const otpRecord = await OtpVerification.findOne({
//       where: { email, otp_code: otpValue },
//       order: [['id', 'DESC']]
//     });

//     if (!otpRecord) return res.status(400).json({ error: 'Invalid OTP' });
//     if (otpRecord.expires_at < new Date())
//       return res.status(400).json({ error: 'OTP expired' });

//     otpRecord.verified = true;
//     await otpRecord.save();

//     res.json({ message: '✅ OTP verified successfully' });
//   } catch (error) {
//     console.error('❌ Error verifying OTP:', error);
//     res.status(500).json({ error: 'Failed to verify OTP' });
//   }
// });

// export default router;




import express from "express";
import { OtpVerification } from "../models/otpVerification.model.js";
import transporter from "../utils/mailTransporter.js";

const router = express.Router();

// Send OTP
router.post("/send", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 5 * 60000);

    await OtpVerification.create({ email, otp_code: otp, expires_at: expires, verified: false });

    await transporter.sendMail({
   from: `"Online Exam System (OES)" <${process.env.EMAIL_USER}>`,
   to: email,
   subject: 'OES : Your OTP Code',
   html: `
     <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; border-radius: 10px; border: 1px solid #e0e0e0; max-width: 500px; margin: auto;">
       <h2 style="text-align: center; color: #1a73e8;">Online Exam System (OES)</h2>
       <p>Hello,  D:\Online-Exam-System-01\backend\src\routes\authRegisterOtp.routes.js</p> 
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
    console.error("❌ OTP Send Error:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});


// Resend OTP

router.post("/resend", async (req, res) => {
  try {
    const { email, name } = req.body;  // include name if required by model
    if (!email) return res.status(400).json({ error: "Email is required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 5 * 60000); // 5 minutes

    // Delete old OTPs
    await OtpVerification.destroy({ where: { email } });

    // Save new OTP
    await OtpVerification.create({
      email,
      name: name || "User", // optional fallback
      otp_code: otp,
      expires_at: expires,
      verified: false,
    });

    // Send OTP
   await transporter.sendMail({
   from: `"Online Exam System (OES)" <${process.env.EMAIL_USER}>`,
   to: email,
   subject: 'OES : Your OTP Code',
   html: `
     <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; border-radius: 10px; border: 1px solid #e0e0e0; max-width: 500px; margin: auto;">
       <h2 style="text-align: center; color: #1a73e8;">Online Exam System (OES)</h2>
       <p>Hello, D:\Online-Exam-System-01\backend\src\routes\authRegisterOtp.routes.js</p>
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
    console.error("❌ OTP Resend Error:", err);
    res.status(500).json({ error: "Failed to resend OTP DD" });
  }
});


export default router;
