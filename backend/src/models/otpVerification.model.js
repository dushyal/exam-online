// import { DataTypes } from 'sequelize';
// import { sequelize } from '../config/db.js';


// export const OtpVerification = sequelize.define('Otp_Verification', {
//   id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//   email: { type: DataTypes.STRING(120), allowNull: false },
//   otp_code: { type: DataTypes.STRING(10), allowNull: false },
//   expires_at: { type: DataTypes.DATE, allowNull: false },
//   verified: { type: DataTypes.BOOLEAN, defaultValue: false }
// }, { timestamps: false });



import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const OtpVerification = sequelize.define(
  "otp_verifications",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    otp_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    // ⭐ REQUIRED FOR REGISTER 2-STEP
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    password: {
      type: DataTypes.STRING, // plain stored temporarily
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);






// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";

// export const OtpVerification = sequelize.define(
//   "otp_verifications",
//   {
//     id: {
//       type: DataTypes.BIGINT,     // MSSQL supports BIGINT IDENTITY
//       autoIncrement: true,
//       primaryKey: true,
//     },

//     email: {
//       type: DataTypes.STRING(255),   // NVARCHAR(255)
//       allowNull: false,
//     },

//     otp_code: {
//       type: DataTypes.STRING(10),    // NVARCHAR(10)
//       allowNull: false,
//     },

//     expires_at: {
//       type: DataTypes.DATE,          // DATETIME2 in MSSQL
//       allowNull: false,
//     },

//     verified: {
//       type: DataTypes.BOOLEAN,       // BIT in MSSQL
//       defaultValue: false,
//     },

//     name: {
//       type: DataTypes.STRING(255),   // NVARCHAR(255)
//       allowNull: true,
//     },

//     password: {
//       type: DataTypes.STRING(500),   // store temporarily as NVARCHAR(MAX-ish)
//       allowNull: true,
//     },
//   },
//   {
//     timestamps: true,
//     createdAt: "createdAt",   // better naming for MSSQL
//     updatedAt: "updatedAt",
//   }
// );

