import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Answer = sequelize.define("answers", {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },

  attempt_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },

  question_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },

  option_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },

  text_answer: { type: DataTypes.TEXT },

  marks_awarded: { type: DataTypes.DECIMAL(5,2), defaultValue: 0 },

  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  timestamps: false,
});


// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";

// export const Answer = sequelize.define("answers", {
//   id: { 
//     type: DataTypes.BIGINT, // MSSQL does not support UNSIGNED
//     autoIncrement: true, 
//     primaryKey: true 
//   },

//   attempt_id: { 
//     type: DataTypes.BIGINT, 
//     allowNull: false 
//   },

//   question_id: { 
//     type: DataTypes.BIGINT, 
//     allowNull: false 
//   },

//   option_id: { 
//     type: DataTypes.BIGINT, 
//     allowNull: true 
//   },

//   text_answer: { 
//     type: DataTypes.TEXT 
//   },

//   marks_awarded: { 
//     type: DataTypes.DECIMAL(5, 2), 
//     defaultValue: 0 
//   },

//   updated_at: { 
//     type: DataTypes.DATE, 
//     defaultValue: DataTypes.NOW 
//   }
// }, {
//   timestamps: false,
// });
