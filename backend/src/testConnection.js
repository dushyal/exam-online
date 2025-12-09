require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection to MySQL has been established successfully.');

    console.log('✅ Connected to MySQL.');

    // Run SQL to list tables in the current database
    const [results] = await sequelize.query('SHOW TABLES;');

    console.log('📋 Tables in database:', process.env.DB_NAME);
    console.table(results); // Nicely formatted output
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
  } finally {
    await sequelize.close();
  }
})();
