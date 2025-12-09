// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";

// export const Option = sequelize.define("options", {
//   id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },

//   question_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },

//   text: { type: DataTypes.STRING(255), allowNull: false },

//   is_correct: { type: DataTypes.BOOLEAN, defaultValue: false },
// }, {
//   timestamps: false,
// });




// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";

// export const Option = sequelize.define("options", {
//   id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
//   question_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
//   text: { type: DataTypes.TEXT, allowNull: false },
//   is_correct: { type: DataTypes.BOOLEAN, defaultValue: false }
// }, {
//   timestamps: true,
//   createdAt: "created_at",
//   updatedAt: false,
// });



import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Question } from "./question.model.js";

export const Option = sequelize.define("options", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },

  question_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },

  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  is_correct: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }

}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
});
