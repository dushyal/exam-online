import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const FraudFlag = sequelize.define("fraud_flags", {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },

  attempt_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },

  reason: { type: DataTypes.TEXT, allowNull: false },

  flagged_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  timestamps: false,
});


// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";

// export const FraudFlag = sequelize.define(
//   "fraud_flags",
//   {
//     id: {
//       type: DataTypes.BIGINT,   // UNSIGNED removed for MSSQL
//       autoIncrement: true,
//       primaryKey: true,
//     },

//     attempt_id: {
//       type: DataTypes.BIGINT,   // Remove UNSIGNED
//       allowNull: false,
//     },

//     reason: {
//       type: DataTypes.TEXT,     // Will become NVARCHAR(MAX)
//       allowNull: false,
//     },

//     flagged_at: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     }
//   },
//   {
//     timestamps: false,
//   }
// );
