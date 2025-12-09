// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";

// export const Attempt = sequelize.define("attempts", {
//   id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },

//   user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },

//   exam_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },

//   attempt_number: { type: DataTypes.INTEGER, allowNull: false },

//   started_at: { type: DataTypes.DATE },

//   submitted_at: { type: DataTypes.DATE },

//   status: { type: DataTypes.STRING(20) }, // IN_PROGRESS, COMPLETED

//   score: { type: DataTypes.DECIMAL(5,2), defaultValue: 0 },

//   pass_status: { type: DataTypes.STRING(10) }, // PASS / FAIL
// }, {
//   timestamps: false,
// });



// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";
// // import { Exam } from "./exam.model.js";
// export const Attempt = sequelize.define("attempts", {
//   id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },

//   user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },

//   exam_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },

//   attempt_number: { type: DataTypes.INTEGER, allowNull: false },

//   started_at: { type: DataTypes.DATE },

//   submitted_at: { type: DataTypes.DATE },

//   status: { type: DataTypes.STRING(20) }, // IN_PROGRESS, COMPLETED, SUBMITTED

//   score: { type: DataTypes.DECIMAL(5,2), defaultValue: 0 },

//   pass_status: { type: DataTypes.STRING(10) }, // PASS / FAIL
// }, {
//   timestamps: false,
// });




import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./user.model.js";
import { Exam } from "./exam.model.js";


export const Attempt = sequelize.define(
  "attempts",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    exam_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    attempt_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    started_at: {
      type: DataTypes.DATE,
    },

    submitted_at: {
      type: DataTypes.DATE,
    },

    status: {
      type: DataTypes.STRING(50),
      defaultValue: "PENDING", // IN_PROGRESS, SUBMITTED, COMPLETED
    },

    score: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    pass_status: {
      type: DataTypes.STRING(20), // PASS / FAIL
    },
  },
  {
    timestamps: false,
  }
);



Attempt.belongsTo(User, { foreignKey: "user_id" });
Attempt.belongsTo(Exam, { foreignKey: "exam_id" });

