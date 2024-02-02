const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");

const company = sequelize.define("Company", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = company;
