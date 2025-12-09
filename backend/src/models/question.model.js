// // import { DataTypes } from "sequelize";
// // import { sequelize } from "../config/db.js";

// // export const Question = sequelize.define("questions", {
// //   id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },

// //   exam_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },

// //   subject: { type: DataTypes.STRING(150) },

// //   text: { type: DataTypes.TEXT, allowNull: false },

// //   type: { type: DataTypes.STRING(20), allowNull: false }, // MCQ, WRITTEN, etc.

// //   marks: { type: DataTypes.INTEGER, allowNull: false },
// // }, {
// //   timestamps: true,
// //   createdAt: "created_at",
// //   updatedAt: false,
// // });


// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";

// export const Question = sequelize.define(
//   "questions",
//   {
//     id: {
//       type: DataTypes.BIGINT.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true,
//     },

//     exam_id: {
//       type: DataTypes.BIGINT.UNSIGNED,
//       allowNull: false,
//     },

//     subject: {
//       type: DataTypes.STRING(150),
//     },

//     text: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },

//     type: {
//       type: DataTypes.STRING(20),
//       allowNull: false,   // MCQ, WRITTEN, etc.
//     },

//     marks: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },

//     level_number: {
//       type: DataTypes.INTEGER,
//       allowNull: false,    
//     },
//   },
//   {
//     timestamps: true,
//     createdAt: "created_at",
//     updatedAt: false,
//   }
// );


// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";

// export const Question = sequelize.define(
//   "questions",
//   {
//     id: {
//       type: DataTypes.BIGINT.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true,
//     },

//     subject: {
//       type: DataTypes.STRING(150),
//       allowNull: false,
//     },

//     text: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },

//     type: {
//       type: DataTypes.STRING(20),
//       allowNull: false,   // MCQ, WRITTEN, etc.
//     },

//     marks: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },

//     level_number: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   },
//   {
//     timestamps: true,
//     createdAt: "created_at",
//     updatedAt: false,
//   }
// );





import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Option } from "./option.model.js";

export const Question = sequelize.define(
  "questions",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    subject: { type: DataTypes.STRING(150), allowNull: false },
    text: { type: DataTypes.TEXT, allowNull: false },
    type: { type: DataTypes.STRING(20), allowNull: false },
    marks: { type: DataTypes.INTEGER, allowNull: false },
    level_number: { type: DataTypes.INTEGER, allowNull: false },
  },
  { timestamps: true, createdAt: "created_at", updatedAt: false }
);

// Association
Question.hasMany(Option, { foreignKey: "question_id", as: "options" });
Option.belongsTo(Question, { foreignKey: "question_id" });
