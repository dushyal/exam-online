import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const User = sequelize.define('user', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },

  name: { type: DataTypes.STRING(100), allowNull: false },

  email: { type: DataTypes.STRING(120), allowNull: false, unique: true },

  password_hash: { type: DataTypes.STRING(255), allowNull: false },

  role: { 
    type: DataTypes.ENUM("ADMIN", "CANDIDATE"),   // ← IMPORTANT
    allowNull: false,
    defaultValue: "CANDIDATE"
  },

  is_blocked: { 
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

}, { 
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false 
});




