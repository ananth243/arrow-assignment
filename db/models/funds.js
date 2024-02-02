const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

const funds = sequelize.define('funds', {
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = funds;