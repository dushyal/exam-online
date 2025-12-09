// // MODELS IMPORT (ONLY import existing exports)
// import { User } from "./user.model.js";
// import { OtpVerification } from "./otpVerification.model.js";

// import { Exam } from "./exam.model.js";
// import { Question } from "./question.model.js";
// import { Option } from "./option.model.js";
// import { Attempt } from "./attempt.model.js";
// import { Answer } from "./answer.model.js";
// import { CameraCapture } from "./cameraCapture.model.js";
// import { FraudFlag } from "./fraudFlag.model.js";
// import { BlockedLevel } from "./blockedLevel.model.js";
// import { EventLog } from "./EventLog.js";

// // ❌ REMOVE — your file does NOT export Proctoring
// // import { Proctoring } from "./proctoring.model.js";

// // ----------------------------------------------------
// // RELATIONS
// // ----------------------------------------------------

// // User → Exams
// User.hasMany(Exam, { foreignKey: "created_by" });
// Exam.belongsTo(User, { foreignKey: "created_by" });

// // Exam → Questions
// Exam.hasMany(Question, { foreignKey: "exam_id" });
// Question.belongsTo(Exam, { foreignKey: "exam_id" });

// // Question → Options
// Question.hasMany(Option, { foreignKey: "question_id" });
// Option.belongsTo(Question, { foreignKey: "question_id" });

// // User → Attempts
// User.hasMany(Attempt, { foreignKey: "user_id" });
// Attempt.belongsTo(User, { foreignKey: "user_id" });

// // Exam → Attempts
// Exam.hasMany(Attempt, { foreignKey: "exam_id" });
// Attempt.belongsTo(Exam, { foreignKey: "exam_id" });

// // Attempt → Answers
// Attempt.hasMany(Answer, { foreignKey: "attempt_id" });
// Answer.belongsTo(Attempt, { foreignKey: "attempt_id" });

// // Question → Answers
// Question.hasMany(Answer, { foreignKey: "question_id" });
// Answer.belongsTo(Question, { foreignKey: "question_id" });

// // Options → Answers
// Option.hasMany(Answer, { foreignKey: "option_id" });
// Answer.belongsTo(Option, { foreignKey: "option_id" });

// // Attempt → Camera Captures
// Attempt.hasMany(CameraCapture, { foreignKey: "attempt_id" });
// CameraCapture.belongsTo(Attempt, { foreignKey: "attempt_id" });

// // Attempt → Fraud Flags
// Attempt.hasMany(FraudFlag, { foreignKey: "attempt_id" });
// FraudFlag.belongsTo(Attempt, { foreignKey: "attempt_id" });

// // Blocked Levels (user blocked in a level)
// User.hasMany(BlockedLevel, { foreignKey: "user_id" });
// Exam.hasMany(BlockedLevel, { foreignKey: "exam_id" });
// BlockedLevel.belongsTo(User, { foreignKey: "user_id" });
// BlockedLevel.belongsTo(Exam, { foreignKey: "exam_id" });

// // User → Event Logs
// User.hasMany(EventLog, { foreignKey: "user_id" });
// EventLog.belongsTo(User, { foreignKey: "user_id" });

// export {
//   User,
//   OtpVerification,
//   Exam,
//   Question,
//   Option,
//   Attempt,
//   Answer,
//   CameraCapture,
//   FraudFlag,
//   BlockedLevel,
//   EventLog
// };







// // MODELS IMPORT (ONLY import existing exports)
// import { User } from "./user.model.js";
// import { OtpVerification } from "./otpVerification.model.js";

// import { Exam } from "./exam.model.js";
// import { Question } from "./question.model.js";
// import { Option } from "./option.model.js";
// import { Attempt } from "./attempt.model.js";
// import { Answer } from "./answer.model.js";
// import { CameraCapture } from "./cameraCapture.model.js";
// import { FraudFlag } from "./fraudFlag.model.js";
// import { BlockedLevel } from "./blockedLevel.model.js";
// import { EventLog } from "./EventLog.js";

// // ----------------------------------------------------
// // RELATIONS
// // ----------------------------------------------------

// // User → Exams
// User.hasMany(Exam, { foreignKey: "created_by" });
// Exam.belongsTo(User, { foreignKey: "created_by" });

// // Exam → Questions
// Exam.hasMany(Question, { foreignKey: "exam_id" });
// Question.belongsTo(Exam, { foreignKey: "exam_id" });

// // Question → Options
// Question.hasMany(Option, { foreignKey: "question_id" });
// Option.belongsTo(Question, { foreignKey: "question_id" });

// // User → Attempts
// User.hasMany(Attempt, { foreignKey: "user_id" });
// Attempt.belongsTo(User, { foreignKey: "user_id" });

// // Exam → Attempts
// Exam.hasMany(Attempt, { foreignKey: "exam_id" });
// Attempt.belongsTo(Exam, { foreignKey: "exam_id", as: "Exam" }); // ✅ alias fix

// // Attempt → Answers
// Attempt.hasMany(Answer, { foreignKey: "attempt_id" });
// Answer.belongsTo(Attempt, { foreignKey: "attempt_id" });

// // Question → Answers
// Question.hasMany(Answer, { foreignKey: "question_id" });
// Answer.belongsTo(Question, { foreignKey: "question_id" });

// // Options → Answers
// Option.hasMany(Answer, { foreignKey: "option_id" });
// Answer.belongsTo(Option, { foreignKey: "option_id" });

// // Attempt → Camera Captures
// Attempt.hasMany(CameraCapture, { foreignKey: "attempt_id" });
// CameraCapture.belongsTo(Attempt, { foreignKey: "attempt_id" });

// // Attempt → Fraud Flags
// Attempt.hasMany(FraudFlag, { foreignKey: "attempt_id" });
// FraudFlag.belongsTo(Attempt, { foreignKey: "attempt_id" });

// // Blocked Levels (user blocked in a level)
// User.hasMany(BlockedLevel, { foreignKey: "user_id" });
// Exam.hasMany(BlockedLevel, { foreignKey: "exam_id" });
// BlockedLevel.belongsTo(User, { foreignKey: "user_id" });
// BlockedLevel.belongsTo(Exam, { foreignKey: "exam_id" });

// // User → Event Logs
// User.hasMany(EventLog, { foreignKey: "user_id" });
// EventLog.belongsTo(User, { foreignKey: "user_id" });

// export {
//   User,
//   OtpVerification,
//   Exam,
//   Question,
//   Option,
//   Attempt,
//   Answer,
//   CameraCapture,
//   FraudFlag,
//   BlockedLevel,
//   EventLog
// };



// MODELS IMPORT (ONLY import existing exports)
import { User } from "./user.model.js";
import { OtpVerification } from "./otpVerification.model.js";

import { Exam } from "./exam.model.js";
import { Question } from "./question.model.js";
import { Option } from "./option.model.js";
import { Attempt } from "./attempt.model.js";
import { Answer } from "./answer.model.js";
import { CameraCapture } from "./cameraCapture.model.js";
import { FraudFlag } from "./fraudFlag.model.js";
import { BlockedLevel } from "./blockedLevel.model.js";
import { EventLog } from "./EventLog.js";

// ----------------------------------------------------
// RELATIONS
// ----------------------------------------------------

// User → Exams
User.hasMany(Exam, { foreignKey: "created_by" });
Exam.belongsTo(User, { foreignKey: "created_by" });

// ✅ Question → Options (CASCADE on delete)
Question.hasMany(Option, { foreignKey: "question_id", onDelete: "CASCADE" });
Option.belongsTo(Question, { foreignKey: "question_id" });

// User → Attempts
User.hasMany(Attempt, { foreignKey: "user_id" });
Attempt.belongsTo(User, { foreignKey: "user_id" });

// Exam → Attempts (CASCADE if needed)
Exam.hasMany(Attempt, { foreignKey: "exam_id", onDelete: "CASCADE" });
Attempt.belongsTo(Exam, { foreignKey: "exam_id", as: "Exam" });

// Attempt → Answers
Attempt.hasMany(Answer, { foreignKey: "attempt_id" });
Answer.belongsTo(Attempt, { foreignKey: "attempt_id" });

// Question → Answers
Question.hasMany(Answer, { foreignKey: "question_id" });
Answer.belongsTo(Question, { foreignKey: "question_id" });

// Options → Answers
Option.hasMany(Answer, { foreignKey: "option_id" });
Answer.belongsTo(Option, { foreignKey: "option_id" });

// Attempt → Camera Captures
Attempt.hasMany(CameraCapture, { foreignKey: "attempt_id" });
CameraCapture.belongsTo(Attempt, { foreignKey: "attempt_id" });

// Attempt → Fraud Flags
Attempt.hasMany(FraudFlag, { foreignKey: "attempt_id" });
FraudFlag.belongsTo(Attempt, { foreignKey: "attempt_id" });

// Blocked Levels (user blocked in a level)
User.hasMany(BlockedLevel, { foreignKey: "user_id" });
Exam.hasMany(BlockedLevel, { foreignKey: "exam_id" });
BlockedLevel.belongsTo(User, { foreignKey: "user_id" });
BlockedLevel.belongsTo(Exam, { foreignKey: "exam_id" });

// User → Event Logs
User.hasMany(EventLog, { foreignKey: "user_id" });
EventLog.belongsTo(User, { foreignKey: "user_id" });

// ----------------------------------------------------
// EXPORT MODELS
// ----------------------------------------------------
export {
  User,
  OtpVerification,
  Exam,
  Question,
  Option,
  Attempt,
  Answer,
  CameraCapture,
  FraudFlag,
  BlockedLevel,
  EventLog
};
