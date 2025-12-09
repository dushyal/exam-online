import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { User } from '../models/user.model.js';


export const EventLog = sequelize.define('Event_Logs', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  event_type: { type: DataTypes.STRING(50), allowNull: false },
  description: { type: DataTypes.TEXT }
}, { timestamps: true, createdAt: 'created_at', updatedAt: false });

// Relations
User.hasMany(EventLog, { foreignKey: 'user_id', onDelete: 'CASCADE' });
EventLog.belongsTo(User, { foreignKey: 'user_id' });


// import { DataTypes } from 'sequelize';
// import { sequelize } from '../config/db.js';
// import { User } from '../models/user.model.js';

// export const EventLog = sequelize.define('Event_Logs', {
//   id: { 
//     type: DataTypes.BIGINT, // MSSQL does not support UNSIGNED
//     autoIncrement: true, 
//     primaryKey: true 
//   },
//   event_type: { 
//     type: DataTypes.STRING(50), 
//     allowNull: false 
//   },
//   description: { type: DataTypes.TEXT },
//   user_id: { 
//     type: DataTypes.BIGINT, // Foreign key to User
//     allowNull: false 
//   }
// }, { 
//   timestamps: true, 
//   createdAt: 'created_at', 
//   updatedAt: false 
// });

// // Relations
// User.hasMany(EventLog, { foreignKey: 'user_id', onDelete: 'CASCADE' });
// EventLog.belongsTo(User, { foreignKey: 'user_id' });
