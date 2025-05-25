const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
 
dotenv.config();

const sequelizeConfig = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false, // Mostrar consultas SQL si ponés true
  }
);

module.exports = { sequelizeConfig };