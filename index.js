const { db } = require("./db/db");
const { scrapeData } = require("./util/scrape");
const { displayData } = require("./util/common");

const company = process.argv[2];

if (!company) throw Error("Invalid args");

const main = async (name) => {
  try {
    await db.connect();
    let company = await db.models.company.findOne({
      where: { name },
    });
    // Scrape data
    let { funding, execs } = await scrapeData(name, company ? true : false);
    if (!company) {
      company = await db.models.company.create({ name });
      if (funding)
        await db.models.funds.bulkCreate(
          funding.map((fund) => ({ ...fund, companyId: company.id }))
        );
      if (execs)
        await db.models.execs.bulkCreate(
          execs.map((exec) => ({ ...exec, companyId: company.id }))
        );
    } else {
      // Updating company in case fields in model are updated in the future. Example: No of employees
      // await company.update({...fieldsToUpdate});
    }
    displayData(company, funding, execs);
  } catch (error) {
    console.error(error);
  } finally {
    await db.close();
  }
};

main(company);
