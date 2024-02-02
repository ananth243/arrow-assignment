const { db } = require("../db/db");

module.exports.fetchData = async (companyId) => {
    const totalAmountSubquery = db.sequelize.literal(
      `(SELECT SUM("amount") FROM "Funds" WHERE "companyId" = ${companyId})`
    );
    companyFunds = await db.models.funds.findAll({
      where: { companyId: companyId },
      attributes: [
        "id",
        "type",
        "amount",
        "date",
        [totalAmountSubquery, "totalAmount"],
      ],
      order: [["date", "ASC"]],
      group: ["id"],
    });
    companyExecs = await db.models.execs.findAll({
      where: { companyId: companyId },
    });
    return { companyFunds, companyExecs };
  };