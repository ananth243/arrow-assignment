const { db } = require("./db/db");
const { scrapeData } = require("./util/scrape");
const {displayData} = require("./util/common");

const company = process.argv[2];

if (!company) throw Error("Invalid args");

const main = async (name) => {
  try {
    await db.connect();
    const company = await db.models.company.findOne({
      where: { name },
    });
    let companyFunds, companyExecs;
    if (!company) {
      // Scrape data
      let { funding, execs } = await scrapeData(name);
      const newCompany = await db.models.company.create({ name });
      if(funding) companyFunds = await db.models.funds.bulkCreate(
        funding.map((fund) => ({ ...fund, companyId: newCompany.id }))
      );
      if(execs) companyExecs= await db.models.execs.bulkCreate(
        execs.map((exec) => ({ ...exec, companyId: newCompany.id }))
      );
    } else {
      const totalAmountSubquery = db.sequelize.literal(
        `(SELECT SUM("amount") FROM "Funds" WHERE "companyId" = ${company.id})`
      );
      companyFunds = await db.models.funds.findAll({
        where: { companyId: company.id },
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
        where: { companyId: company.id },
      });
    }
    displayData(company, companyFunds, companyExecs);
  } catch (error) {
    console.error(error);
  } finally {
    await db.close();
  }
};

main(company);
