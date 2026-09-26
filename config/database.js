require('dotenv').config();
const { Sequelize } = require('sequelize');

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST
} = process.env;

const connectionOptions = {
  host: DB_HOST,
  dialect: 'postgres'
};

const dbConnection = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  connectionOptions
);

module.exports = dbConnection;