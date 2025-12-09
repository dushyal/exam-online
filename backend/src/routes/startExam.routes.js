// import express from "express";
// import authMiddleware from "../middleware/auth.middleware.js";
// import { getExamQuestions, submitExam } from "../controllers/startExam.controller.js";

// const router = express.Router();

// router.get("/:subject/:level", authMiddleware, getExamQuestions);
// router.post("/:subject/:level/submit", authMiddleware, submitExam);

// export default router;





// routes/startExam.routes.js

import express from "express";
import authMiddleware from "../middleware/auth.Middleware.js";
import { getExamQuestions, submitExam } from "../controllers/startExam.controller.js";

const router = express.Router();

router.get("/:subject/:level", authMiddleware, getExamQuestions);
router.post("/:subject/:level/submit", authMiddleware, submitExam);

export default router;
