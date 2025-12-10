// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import routes from "./routes/index.js";
// import studentDashboardRoutes from "./routes/studentDashboard.routes.js";

// import { connectDB, sequelize } from "./config/db.js";

// // LOAD ALL MODELS + RELATIONS
// import "./models/index.js";

// dotenv.config();
// const app = express();

// app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/student", studentDashboardRoutes);

// app.get("/", (req, res) => res.send("Server running"));
// app.use("/api", routes);

// await connectDB();

// await sequelize.sync({ alter: true });

// await sequelize.sync();


// app.listen(process.env.PORT || 5000, () =>
//   console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`)
// );


// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import routes from "./routes/index.js";
// import studentDashboardRoutes from "./routes/studentDashboard.routes.js";
// import { connectDB, sequelize } from "./config/db.js";
// import subjectRoutes from "./routes/subject.routes.js";
// import startExamRoutes from "./routes/startExam.routes.js";
// import examRoutes from "./routes/startExam.routes.js";






// // LOAD ALL MODELS + RELATIONS
// import "./models/index.js";

// dotenv.config();
// const app = express();

// app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

// app.use("/api/exam", examRoutes);
// app.use("/api/student/exam", startExamRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/student", studentDashboardRoutes);
// app.use("/api/student/subject", subjectRoutes);
// app.get("/", (req, res) => res.send("Server running"));

// // ✅ Wrap startup in async function
// const startServer = async () => {
//   try {
//     await connectDB();

    
      
//     // ✅ Only one sync call
//     await sequelize.sync({ alter: true });



//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () =>
//       console.log(`🚀 Server running on http://localhost:${PORT}`)
//     );
//   } catch (err) {
//     console.error("Server startup error:", err);
//   }
// };

// startServer();








import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import routes from "./routes/index.js";
import studentDashboardRoutes from "./routes/studentDashboard.routes.js";
import subjectRoutes from "./routes/subject.routes.js";

import examRoutes from "./routes/startExam.routes.js";
import adminAuthRoutes from "./routes/admin/adminAuth.routes.js";
import adminExamRoutes from "./routes/admin/adminExam.routes.js";
import adminQuestionRoutes from "./routes/admin/adminQuestion.routes.js";
import adminOptionRoutes from "./routes/admin/adminOption.routes.js";
import adminAssignRoutes from "./routes/admin/adminAssign.routes.js";
import adminResultsRoutes from "./routes/admin/adminResults.routes.js";
import adminStudentRoutes from "./routes/admin/adminStudent.routes.js";







import { connectDB, sequelize } from "./config/db.js";

// LOAD MODELS
import "./models/index.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/", (req, res) => res.send("Server running"));
app.use("/api/admin/students", adminStudentRoutes);
app.use("/api/start-exam", examRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/student", studentDashboardRoutes);
app.use("/api/student/subject", subjectRoutes);
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/exams", adminExamRoutes);
app.use("/api/admin/questions", adminQuestionRoutes);
app.use("/api/admin/options", adminOptionRoutes);
app.use("/api/admin/assign", adminAssignRoutes);
app.use("/api/admin/results", adminResultsRoutes);

const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: true });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Server startup error:", err);
  }
};

startServer();
