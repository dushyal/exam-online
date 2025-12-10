// // import express from "express";
// // import bcrypt from "bcrypt";
// // import { User } from "../models/user.model.js";
// // import { OtpVerification } from "../models/otpVerification.model.js";
// // import { EventLog } from "../models/EventLog.js";

// // const router = express.Router();

// // /**
// //  * 1️⃣ REGISTER - SEND OTP
// //  */
// // router.post("/register-init", async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body;

// //     if (!name || !email || !password)
// //       return res.status(400).json({ error: "All fields required" });

// //     const existing = await User.findOne({ where: { email } });
// //     if (existing)
// //       return res.status(400).json({ error: "Email already registered" });

// //     // Generate OTP
// //     const otp = Math.floor(100000 + Math.random() * 900000).toString();
// //     const expires = new Date(Date.now() + 5 * 60000);

// //     await OtpVerification.create({
// //       name,
// //       email,
// //       password,
// //       otp_code: otp,
// //       expires_at: expires,
// //       verified: false,
// //     });

// //     console.log("OTP sent:", otp);

// //     res.json({ message: "OTP sent", email });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Error initiating registration" });
// //   }
// // });

// // /**
// //  * 2️⃣ REGISTER - VERIFY OTP + CREATE USER
// //  */
// // router.post("/register-complete", async (req, res) => {
// //   try {
// //     const { email, otp } = req.body;

// //     if (!email || !otp)
// //       return res.status(400).json({ error: "Email & OTP required" });

// //     const record = await OtpVerification.findOne({
// //       where: { email, otp_code: otp },
// //       order: [["id", "DESC"]],
// //     });

// //     if (!record) return res.status(400).json({ error: "Invalid OTP" });
// //     if (record.expires_at < new Date())
// //       return res.status(400).json({ error: "OTP expired" });

// //     // Create final user
// //     const hashed = await bcrypt.hash(record.password, 10);

// //     const user = await User.create({
// //       name: record.name,
// //       email: record.email,
// //       password_hash: hashed,
// //       role: "CANDIDATE",
// //     });

// //     await EventLog.create({
// //       user_id: user.id,
// //       event_type: "REGISTER",
// //       description: `User ${record.name} registered.`,
// //     });

// //     record.verified = true;
// //     await record.save();

// //     res.json({ message: "Registration successful" });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Error completing registration" });
// //   }
// // });

// // export default router;





// import express from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model.js";
// import { OtpVerification } from "../models/otpVerification.model.js";
// import { EventLog } from "../models/EventLog.js";

// const router = express.Router();

// /*
// |--------------------------------------------------------------------------
// | 1️⃣ REGISTER — SEND OTP
// |--------------------------------------------------------------------------
// */
// router.post("/register-init", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password)
//       return res.status(400).json({ error: "All fields required" });

//     const existing = await User.findOne({ where: { email } });
//     if (existing)
//       return res.status(400).json({ error: "Email already registered" });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const expires = new Date(Date.now() + 5 * 60000);

//     await OtpVerification.create({
//       name,
//       email,
//       password,
//       otp_code: otp,
//       expires_at: expires,
//       verified: false,
//     });

//     console.log("OTP:", otp);

//     res.json({ message: "OTP sent", email });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to send OTP" });
//   }
// });

// /*
// |--------------------------------------------------------------------------
// | 2️⃣ REGISTER COMPLETE — VERIFY OTP
// |--------------------------------------------------------------------------
// */
// router.post("/register-complete", async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const record = await OtpVerification.findOne({
//       where: { email, otp_code: otp },
//       order: [["id", "DESC"]],
//     });

//     if (!record) return res.status(400).json({ error: "Invalid OTP" });

//     if (record.expires_at < new Date())
//       return res.status(400).json({ error: "OTP expired" });

//     const hashed = await bcrypt.hash(record.password, 10);

//     const user = await User.create({
//       name: record.name,
//       email: record.email,
//       password_hash: hashed,
//       role: "CANDIDATE",
//     });

//     await EventLog.create({
//       user_id: user.id,
//       event_type: "REGISTER",
//       description: `User ${user.name} registered.`,
//     });

//     record.verified = true;
//     await record.save();

//     res.json({ message: "Registration successful" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Registration error" });
//   }
// });

// /**
//  * 3️⃣ LOGIN
//  */
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password)
//       return res.status(400).json({ error: "Email and password required" });

//     const user = await User.findOne({ where: { email } });

//     if (!user)
//       return res.status(400).json({ error: "Invalid email or password" });

//     const isMatch = await bcrypt.compare(password, user.password_hash);
//     if (!isMatch)
//       return res.status(400).json({ error: "Invalid email or password" });

//     // Create token (optional)
//     const token = "test-token-" + user.id;

//     res.json({
//       message: "Login success",
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//     });
//   } catch (err) {
//     console.error("LOGIN ERROR:", err);
//     res.status(500).json({ error: "Server error during login" });
//   }
// });

// export default router;



// import express from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model.js";
// import { OtpVerification } from "../models/otpVerification.model.js";
// import { EventLog } from "../models/EventLog.js";
// import transporter from "../utils/mailTransporter.js";

// const router = express.Router();

// /* ------------------------
// | 1️⃣ REGISTER — SEND OTP
// ------------------------- */
// router.post("/register-init", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password)
//       return res.status(400).json({ error: "All fields required" });

//     const existing = await User.findOne({ where: { email } });
//     if (existing)
//       return res.status(400).json({ error: "Email already registered" });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const expires = new Date(Date.now() + 5 * 60000);

//     await OtpVerification.create({
//       name,
//       email,
//       password,
//       otp_code: otp,
//       expires_at: expires,
//       verified: false,
//     });

//     // Send OTP email
//     await transporter.sendMail({
//       from: `"Online Exam System (OES)" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "OES : Your Registration OTP",
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px; border-radius: 10px; border: 1px solid #e0e0e0;">
//           <h2>Welcome ${name}</h2>
//           <p>Your OTP for registration is:</p>
//           <h1 style="letter-spacing: 3px; color: #1a73e8;">${otp}</h1>
//           <p>Valid for 5 minutes. Do not share it with anyone.</p>
//         </div>
//       `,
//     });

//     res.json({ message: "OTP sent successfully", email });
//   } catch (error) {
//     console.error("❌ Registration OTP Error:", error);
//     res.status(500).json({ error: "Failed to send OTP" });
//   }
// });

// /* ------------------------
// | 2️⃣ REGISTER COMPLETE — VERIFY OTP + CREATE USER
// ------------------------- */
// // router.post("/register-complete", async (req, res) => {
// //   try {
// //     const { email, otp } = req.body;
// //     if (!email || !otp)
// //       return res.status(400).json({ error: "Email & OTP required" });

// //     const record = await OtpVerification.findOne({
// //       where: { email, otp_code: otp },
// //       order: [["id", "DESC"]],
// //     });

// //     if (!record) return res.status(400).json({ error: "Invalid OTP" });
// //     if (record.expires_at < new Date())
// //       return res.status(400).json({ error: "OTP expired" });

// //     const hashed = await bcrypt.hash(record.password, 10);

// //     const user = await User.create({
// //       name: record.name,
// //       email: record.email,
// //       password_hash: hashed,
// //       role: "CANDIDATE",
// //     });

// //     await EventLog.create({
// //       user_id: user.id,
// //       event_type: "REGISTER",
// //       description: `User ${user.name} registered.`,
// //     });

// //     record.verified = true;
// //     await record.save();

// //     res.json({ message: "Registration successful" });
// //   } catch (error) {
// //     console.error("❌ Register Complete Error:", error);
// //     res.status(500).json({ error: "Registration error" });
// //   }
// // });


// router.post("/register-complete", async (req, res) => {
//   try {
//     const { email, otp, password } = req.body; // optionally allow password here
//     if (!email || !otp)
//       return res.status(400).json({ error: "Email & OTP required" });

//     const record = await OtpVerification.findOne({
//       where: { email, otp_code: otp },
//       order: [["id", "DESC"]],
//     });

//     if (!record) return res.status(400).json({ error: "Invalid OTP" });
//     if (record.expires_at < new Date())
//       return res.status(400).json({ error: "OTP expired" });

//     // Ensure password exists
//     const plainPassword = record.password || password;
//     if (!plainPassword)
//       return res.status(400).json({ error: "Password missing" });

//     const hashed = await bcrypt.hash(plainPassword, 10);

//     const user = await User.create({
//       name: record.name,
//       email: record.email,
//       password_hash: hashed,
//       role: "CANDIDATE",
//     });

//     await EventLog.create({
//       user_id: user.id,
//       event_type: "REGISTER",
//       description: `User ${user.name} registered.`,
//     });

//     record.verified = true;
//     await record.save();

//     res.json({ message: "Registration successful" });
//   } catch (error) {
//     console.error("❌ Register Complete Error:", error);
//     res.status(500).json({ error: "Registration error" });
//   }
// });


// /* ------------------------
// | 3️⃣ LOGIN
// ------------------------- */
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res.status(400).json({ error: "Email and password required" });

//     const user = await User.findOne({ where: { email } });
//     if (!user) return res.status(400).json({ error: "Invalid email or password" });

//     const isMatch = await bcrypt.compare(password, user.password_hash);
//     if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

//     // Create token (JWT optional)
//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: user.role },
//       process.env.JWT_ACCESS_SECRET,
//       { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: { id: user.id, name: user.name, email: user.email, role: user.role },
//     });
//   } catch (err) {
//     console.error("❌ LOGIN ERROR:", err);
//     res.status(500).json({ error: "Server error during login" });
//   }
// });



// // router.post("/resend", async (req, res) => {
// //   try {
// //     const { email, name,password } = req.body;
// //     if (!email) return res.status(400).json({ error: "Email is required" });

// //     const otp = Math.floor(100000 + Math.random() * 900000).toString();
// //     const expires = new Date(Date.now() + 5 * 60000);

// //     console.log("Resend OTP generated:", otp);

// //     await OtpVerification.destroy({ where: { email } });

// //     // await OtpVerification.create({
// //     //   email,
// //     //   name: name || null, // make it null if not needed
// //     //   otp_code: otp,
// //     //   expires_at: expires,
// //     //   verified: false,
// //     // });
// //     const hashed = await bcrypt.hash(record.password, 10);
 
// //     const newOtp = await OtpVerification.create({
// //       name,
// //       email,
// //       password: hashed,
// //       otp_code: otp,
// //       expires_at: expires,
// //       verified: false,
// //     });

// //     console.log("OTP record created:", newOtp.toJSON());

// //     await transporter.sendMail({
// //       from: `"Online Exam System (OES)" <${process.env.EMAIL_USER}>`,
// //       to: email,
// //       subject: "OES : Your OTP Code",
// //       html: `
// //         <h2>Welcome ${name || "User"}</h2>
// //         <p>Your new OTP is:</p>
// //         <h1>${otp}</h1>
// //         <p>Valid for 5 minutes.</p>
// //       `,
// //     });

// //     res.json({ message: "✅ OTP resent successfully" });
// //   } catch (err) {
// //     console.error("❌ OTP Resend Error:", err);
// //     res.status(500).json({ error: "Failed to resend OTP" });
// //   }
// // });


// router.post("/resend", async (req, res) => {
//   try {
//     const { email, name, password } = req.body;
//     if (!email) return res.status(400).json({ error: "Email is required" });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const expires = new Date(Date.now() + 5 * 60000);

//     console.log("Resend OTP generated:", otp);

//     // Delete old OTPs for this email
//     await OtpVerification.destroy({ where: { email } });

//     // Save new OTP — store password if provided, otherwise null
//     const newOtp = await OtpVerification.create({
//       name: name || "User",
//       email,
//       password: password || null, // keep password null if not sent
//       otp_code: otp,
//       expires_at: expires,
//       verified: false,
//     });

//     console.log("OTP record created:", newOtp.toJSON());

//     // Send OTP email
//     await transporter.sendMail({
//       from: `"Online Exam System (OES)" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "OES : Your OTP Code",
//       html: `
//         <h2>Welcome ${name || "User"}</h2>
//         <p>Your new OTP is:</p>
//         <h1>${otp}</h1>
//         <p>Valid for 5 minutes.</p>
//       `,
//     });

//     res.json({ message: "✅ OTP resent successfully" });
//   } catch (err) {
//     console.error("❌ OTP Resend Error:", err);
//     res.status(500).json({ error: "Failed to resend OTP" });
//   }
// });


// export default router;



import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { OtpVerification } from "../models/otpVerification.model.js";
import { EventLog } from "../models/EventLog.js";
import transporter from "../utils/mailTransporter.js";

const router = express.Router();

/* ------------------------------------------
| 1️⃣ REGISTER — SEND OTP
------------------------------------------- */
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

    // Save OTP + raw password temporarily
    await OtpVerification.create({
      name,
      email,
      password, // raw password
      otp_code: otp,
      expires_at: expires,
      verified: false,
    });
console.log( req.body)
    // Send email
    await transporter.sendMail({
   from: `"Online Exam System (OES)" <${process.env.EMAIL_USER}>`,
   to: email,
   subject: 'OES : Your OTP Code',
   html: `
     <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; border-radius: 10px; border: 1px solid #e0e0e0; max-width: 500px; margin: auto;">
       <h2 style="text-align: center; color: #1a73e8;">Online Exam System (OES)</h2>
       <p>Hello, D:\Online-Exam-System-01\backend\src\routes\auth.routes.js</p>
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


    res.json({ message: "OTP sent successfully", email });

  } catch (error) {
    console.error("❌ Registration OTP Error:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

/* ------------------------------------------
| 2️⃣ REGISTER COMPLETE — VERIFY OTP
------------------------------------------- */
router.post("/register-complete", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({ error: "Email & OTP required" });

    const record = await OtpVerification.findOne({
      where: { email, otp_code: otp },
      order: [["id", "DESC"]],
    });

    if (!record) return res.status(400).json({ error: "Invalid OTP" });
    if (record.expires_at < new Date())
      return res.status(400).json({ error: "OTP expired" });

    if (!record.password)
      return res.status(400).json({ error: "Password missing" });

    // Hash original password saved in register-init
    const hashedPassword = await bcrypt.hash(record.password, 10);

    const user = await User.create({
      name: record.name,
      email: record.email,
      password_hash: hashedPassword,
      role: "CANDIDATE",
    });

    await EventLog.create({
      user_id: user.id,
      event_type: "REGISTER",
      description: `User ${user.name} registered.`,
    });

    record.verified = true;
    await record.save();

    res.json({ message: "Registration successful" });

  } catch (error) {
    console.error("❌ Register Complete Error:", error);
    res.status(500).json({ error: "Registration error" });
  }
});

/* ------------------------------------------
| 3️⃣ LOGIN
------------------------------------------- */
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password)
//       return res.status(400).json({ error: "Email & password required" });

//     const user = await User.findOne({ where: { email } });
//     if (!user)
//       return res.status(400).json({ error: "Invalid email or password" });

//     const isMatch = await bcrypt.compare(password, user.password_hash);
//     if (!isMatch)
//       return res.status(400).json({ error: "Invalid email or password" });

//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: user.role },
//       process.env.JWT_ACCESS_SECRET,
//       { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: { id: user.id, name: user.name, email: user.email, role: user.role },
//     });

//   } catch (err) {
//     console.error("❌ LOGIN ERROR:", err);
//     res.status(500).json({ error: "Server error during login" });
//   }
// });



/* ------------------------------------------
| 3️⃣ LOGIN  (FIXED WITH is_blocked CHECK)
------------------------------------------- */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email & password required" });

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    // 🔥 BLOCK CHECK HERE
    if (user.is_blocked === 1 || user.is_blocked === true) {
      return res.status(403).json({
        error: "Your account is blocked by the admin. Contact support.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("❌ LOGIN ERROR:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});


/* ------------------------------------------
| 4️⃣ RESEND OTP
------------------------------------------- */
router.post("/resend", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ error: "Email required" });

    // Find the existing OTP record to keep same password
    const oldRecord = await OtpVerification.findOne({
      where: { email },
      order: [["id", "DESC"]],
    });

    const password = oldRecord ? oldRecord.password : null;

    if (!password)
      return res.status(400).json({ error: "Password missing. Restart registration." });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 5 * 60000);

    await OtpVerification.destroy({ where: { email } });

    const newOtp = await OtpVerification.create({
      name: oldRecord?.name || "User",
      email,
      password,
      otp_code: otp,
      expires_at: expires,
      verified: false,
    });

   await transporter.sendMail({
   from: `"Online Exam System (OES)" <${process.env.EMAIL_USER}>`,
   to: email,
   subject: 'OES : Your OTP Code',
   html: `
     <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; border-radius: 10px; border: 1px solid #e0e0e0; max-width: 500px; margin: auto;">
       <h2 style="text-align: center; color: #1a73e8;">Online Exam System (OES)</h2>
       <p>Hello, D:\Online-Exam-System-01\backend\src\routes\auth.routes.js</p>
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

    res.json({ message: "OTP resent successfully" });

  } catch (err) {
    console.error("❌ OTP Resend Error:", err);
    res.status(500).json({ error: "Failed to resend OTP" });
  }
});


import authMiddleware from "../middleware/auth.middleware.js";

/* ------------------------------------------
| 5️⃣ GET LOGGED-IN USER (AUTH REQUIRED)
------------------------------------------- */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "role"],
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error("ME ROUTE ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;
