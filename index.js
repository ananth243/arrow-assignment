const { db } = require("./db/db");
const { scrapeData } = require("./util/scrape");
const { displayData } = require("./util/common");

const company = process.argv[2];

if (!company) throw Error("Invalid args");

const main = async (name) => {
  try {
    await db.connect();
    // findOne to be replaced with a loop with findAll in case companies with same name are possible 
    let company = await db.models.company.findOne({
      where: { name },
      include: [{ model: db.models.execs }, { model: db.models.funds }],
    });
    // Scrape data
    let { funding, execs } = await scrapeData(name);
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
      // Check if new funding
      const fundsNotInDB = funding.filter(
        (obj) => !company.funds.some((key) => key.type === obj.type)
      );
      if (fundsNotInDB.length > 0)
        await db.models.funds.bulkCreate(fundsNotInDB.map((fund) => ({ ...fund, companyId: company.id })));
    }
    displayData(company, funding, execs);
  } catch (error) {
    console.error(error);
  } finally {
    await db.close();
  }
};

main(company);
