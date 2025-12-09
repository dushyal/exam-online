import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const BlockedLevel = sequelize.define("blocked_levels", {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },

  user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },

  exam_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },

  blocked_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  timestamps: false
});



// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";

// export const BlockedLevel = sequelize.define("blocked_levels", {
//   id: { 
//     type: DataTypes.BIGINT, // MSSQL does not support UNSIGNED
//     autoIncrement: true, 
//     primaryKey: true 
//   },

//   user_id: { 
//     type: DataTypes.BIGINT, 
//     allowNull: false 
//   },

//   exam_id: { 
//     type: DataTypes.BIGINT, 
//     allowNull: false 
//   },

//   blocked_at: { 
//     type: DataTypes.DATE, 
//     defaultValue: DataTypes.NOW 
//   },
// }, {
//   timestamps: false
// });
