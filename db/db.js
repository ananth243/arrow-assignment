const { config } = require("dotenv");
const company = require("./models/company");
const execs = require("./models/execs");
const funds = require("./models/funds");
const { sequelize } = require("./config");

config();

let db = {};

db.connect = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
};

db.close = async () => {
  await sequelize.close();
};

db.sequelize = sequelize;
db.models = {};
db.models.company = company;
db.models.funds = funds;
db.models.execs = execs;

db.models.company.hasMany(funds, {
  foreignKey: "companyId",
});
db.models.funds.belongsTo(company, {
  foreignKey: "companyId",
});

db.models.company.hasMany(execs, {
  foreignKey: "companyId",
});
db.models.funds.belongsTo(company, {
  foreignKey: "companyId",
});

module.exports.db = db;
