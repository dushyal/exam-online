// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";

// export const Exam = sequelize.define("exams", {
//   id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },

//   level_number: { type: DataTypes.INTEGER, allowNull: false },

//   title: { type: DataTypes.STRING(150), allowNull: false },

//   description: { type: DataTypes.TEXT },

//   duration_minutes: { type: DataTypes.INTEGER, allowNull: false },

//   total_marks: { type: DataTypes.INTEGER, allowNull: false },

//   passing_percent: { type: DataTypes.INTEGER, allowNull: false },

//   max_attempts: { type: DataTypes.INTEGER, allowNull: false },

//   start_time: { type: DataTypes.DATE },

//   end_time: { type: DataTypes.DATE },

//   photo_interval_seconds: { type: DataTypes.INTEGER },

//   enable_proctoring: { type: DataTypes.BOOLEAN, defaultValue: false },

//   created_by: { type: DataTypes.BIGINT.UNSIGNED },
// }, {
//   timestamps: true,
//   createdAt: "created_at",
//   updatedAt: false,
// });




// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";
// // import { Attempt } from "./attempt.model.js";

// export const Exam = sequelize.define("exams", {
//   id: { 
//     type: DataTypes.BIGINT.UNSIGNED, 
//     autoIncrement: true, 
//     primaryKey: true 
//   },

//   subject: { 
//     type: DataTypes.STRING(150), 
//     allowNull: false  // HTML / CSS / JS / React etc
//   },

//   level_number: { 
//     type: DataTypes.INTEGER, 
//     allowNull: false 
//   },

//   title: { 
//     type: DataTypes.STRING(150), 
//     allowNull: false  // Example: "Level 1 Exam"
//   },

//   description: { type: DataTypes.TEXT },

//   duration_minutes: { type: DataTypes.INTEGER, allowNull: false },

//   total_marks: { type: DataTypes.INTEGER, allowNull: false },

//   passing_percent: { type: DataTypes.INTEGER, allowNull: false },

//   max_attempts: { type: DataTypes.INTEGER, allowNull: false },

//   start_time: { type: DataTypes.DATE },

//   end_time: { type: DataTypes.DATE },

//   photo_interval_seconds: { type: DataTypes.INTEGER },

//   enable_proctoring: { 
//     type: DataTypes.BOOLEAN, 
//     defaultValue: false 
//   },

//   created_by: { 
//     type: DataTypes.BIGINT.UNSIGNED 
//   },

// }, {
//   timestamps: true,
//   createdAt: "created_at",
//   updatedAt: false,
// });


// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";

// export const Exam = sequelize.define("exams", {
//   id: { 
//     type: DataTypes.BIGINT.UNSIGNED, 
//     autoIncrement: true, 
//     primaryKey: true 
//   },
//   subject: { type: DataTypes.STRING(150), allowNull: false },
//   level_number: { type: DataTypes.INTEGER, allowNull: false },
//   title: { type: DataTypes.STRING(150), allowNull: false },
//   description: { type: DataTypes.TEXT },
//   duration_minutes: { type: DataTypes.INTEGER, allowNull: false },
//   total_marks: { type: DataTypes.INTEGER, allowNull: false },
//   passing_percent: { type: DataTypes.INTEGER, allowNull: false },
//   max_attempts: { type: DataTypes.INTEGER, allowNull: false },
//   start_time: { type: DataTypes.DATE },
//   end_time: { type: DataTypes.DATE },
//   photo_interval_seconds: { type: DataTypes.INTEGER },
//   enable_proctoring: { type: DataTypes.BOOLEAN, defaultValue: false },
//   created_by: { type: DataTypes.BIGINT.UNSIGNED },
// }, {
//   timestamps: true,
//   createdAt: "created_at",
//   updatedAt: false,
// });






// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";

// export const Exam = sequelize.define("exams", {
//   id: { 
//     type: DataTypes.BIGINT.UNSIGNED, 
//     autoIncrement: true, 
//     primaryKey: true 
//   },

//   subject: { type: DataTypes.STRING(150), allowNull: false },

//   level_number: { type: DataTypes.INTEGER, allowNull: false },

//   title: { type: DataTypes.STRING(150), allowNull: false },

//   description: { type: DataTypes.TEXT },

//   duration_minutes: { type: DataTypes.INTEGER, allowNull: false },

//   total_marks: { type: DataTypes.INTEGER, allowNull: false },

//   passing_percent: { type: DataTypes.INTEGER, allowNull: false },

//   max_attempts: { type: DataTypes.INTEGER, allowNull: false },

//   start_time: { type: DataTypes.DATE },

//   end_time: { type: DataTypes.DATE },

//   photo_interval_seconds: { type: DataTypes.INTEGER },

//   enable_proctoring: { type: DataTypes.BOOLEAN, defaultValue: false },

//   created_by: { type: DataTypes.BIGINT.UNSIGNED },

// }, {
//   timestamps: true,
//   createdAt: "created_at",
//   updatedAt: false,
// });






// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";

// export const Exam = sequelize.define("exams", {
//   id: { 
//     type: DataTypes.BIGINT.UNSIGNED, 
//     autoIncrement: true, 
//     primaryKey: true 
//   },

//   subject: { type: DataTypes.STRING(150), allowNull: false },
//   level_number: { type: DataTypes.INTEGER, allowNull: false },
//   title: { type: DataTypes.STRING(150), allowNull: false },
//   description: { type: DataTypes.TEXT },
//   duration_minutes: { type: DataTypes.INTEGER, allowNull: false },
//   total_marks: { type: DataTypes.INTEGER, allowNull: false },
//   passing_percent: { type: DataTypes.INTEGER, allowNull: false },
//   max_attempts: { type: DataTypes.INTEGER, allowNull: false },
//   start_time: { type: DataTypes.DATE },
//   end_time: { type: DataTypes.DATE },
//   photo_interval_seconds: { type: DataTypes.INTEGER },
//   enable_proctoring: { type: DataTypes.BOOLEAN, defaultValue: false },
//   created_by: { type: DataTypes.BIGINT.UNSIGNED },

//   // Store selected questions
//   selected_questions: {
//     type: DataTypes.JSON,
//     allowNull: false,
//   },

//   // Store total questions allowed
//   total_questions: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },

// }, {
//   timestamps: true,
//   createdAt: "created_at",
//   updatedAt: false,
// });



import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Exam = sequelize.define("exams", {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  subject: { type: DataTypes.STRING(150), allowNull: false },
  level_number: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING(150), allowNull: false },
  description: { type: DataTypes.TEXT },
  duration_minutes: { type: DataTypes.INTEGER, allowNull: false },
  total_marks: { type: DataTypes.INTEGER, allowNull: false },
  passing_percent: { type: DataTypes.INTEGER, allowNull: false },
  max_attempts: { type: DataTypes.INTEGER, allowNull: false },

  start_time: { type: DataTypes.DATE, allowNull: true },   // ✅
  end_time: { type: DataTypes.DATE, allowNull: true },     // ✅

  photo_interval_seconds: { type: DataTypes.INTEGER },
  enable_proctoring: { type: DataTypes.BOOLEAN, defaultValue: false },
  created_by: { type: DataTypes.BIGINT.UNSIGNED },

  selected_questions: { type: DataTypes.JSON, allowNull: false },
  total_questions: { type: DataTypes.INTEGER, allowNull: false }, // ✅
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
});
