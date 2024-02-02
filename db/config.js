const { Sequelize } = require("sequelize");
require('dotenv').config();

module.exports.sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
  }
);
