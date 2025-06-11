const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
 
dotenv.config();

//configuracion sequelize, documentacion https://sequelize.org/docs/v6/getting-started/ opcion 3
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