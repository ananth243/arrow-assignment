const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");

const execs = sequelize.define("execs", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  post: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = execs;
