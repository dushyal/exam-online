import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const CameraCapture = sequelize.define("camera_captures", {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },

  attempt_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },

  image_url: { type: DataTypes.TEXT, allowNull: false },

  captured_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

  face_detected: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  timestamps: false,
});


// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";

// export const CameraCapture = sequelize.define("camera_captures", {
//   id: { 
//     type: DataTypes.BIGINT, // MSSQL does not support UNSIGNED
//     autoIncrement: true, 
//     primaryKey: true 
//   },

//   attempt_id: { 
//     type: DataTypes.BIGINT, 
//     allowNull: false 
//   },

//   image_url: { 
//     type: DataTypes.TEXT, 
//     allowNull: false 
//   },

//   captured_at: { 
//     type: DataTypes.DATE, 
//     defaultValue: DataTypes.NOW 
//   },

//   face_detected: { 
//     type: DataTypes.BOOLEAN, // Sequelize maps to BIT in MSSQL
//     defaultValue: false 
//   },
// }, {
//   timestamps: false,
// });
