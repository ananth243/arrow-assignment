const clc = require("cli-color");

const log = {
  green: (text) => console.log(clc.green(text)),
  red: (text) => console.log(clc.red(text)),
  blue: (text) => console.log(clc.blue(text)),
};

module.exports.formatNumber = (value) => {
  const B = 1000000000,
    M = 1000000,
    K = 1000;
  if (value >= B) {
    return (
      (value / B).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }) + "B"
    );
  } else if (value >= M) {
    return (
      (value / M).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }) + "M"
    );
  } else if (value >= K) {
    return (
      (value / K).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }) + "K"
    );
  } else {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });
  }
};

module.exports.displaySQLData = (company, funds, execs) => {
  log.green(`\nCompany: ${company.name}`);
  if (funds && funds.length > 0) {
    let fundingAmount = funds[0].dataValues.totalAmount;
    if (!fundingAmount)
      fundingAmount = funds.reduce(
        (acc, fund) => acc + parseInt(fund.amount),
        0
      );
    log.blue(`Total Funding: ${this.formatNumber(fundingAmount)}`);
    log.blue(`Funding rounds: ${funds.length}`);
    console.table(
      funds.map((fund) => ({
        type: fund.type,
        amount: this.formatNumber(Number(fund.amount)),
        date: fund.date.toDateString(),
      }))
    );
  } else log.red("\nNo funding details available");
  if (execs && execs.length > 0) {
    log.blue(`Number of executives: ${execs.length}`);
    console.table(
      execs.map((exec) => exec.toJSON()),
      ["name", "post"]
    );
  } else log.red("No company executives available");
};

module.exports.displayData = (company, funds, execs) => {
  log.green(`\nCompany: ${company.name}`);
  if (funds && funds.length > 0) {
    let fundingAmount = funds.reduce(
      (acc, fund) => acc + parseInt(fund.amount),
      0
    );
    log.blue(`Total Funding: ${this.formatNumber(fundingAmount)}`);
    log.blue(`Funding rounds: ${funds.length}`);
    console.table(
      funds.map((fund) => ({
        type: fund.type,
        amount: this.formatNumber(Number(fund.amount)),
        date: fund.date.toDateString(),
      }))
    );
  } else log.red("\nNo funding details available");
  if (execs && execs.length > 0) {
    log.blue(`Number of executives: ${execs.length}`);
    console.table(execs, ["name", "post"]);
  } else log.red("No company executives available");
};

module.exports.rotateUA = () => {
  const userAgents = [
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    // More user agents
  ];
  const randomUAIndex = Math.floor(Math.random() * userAgents.length);
  return userAgents[randomUAIndex];
};

/*
Out of Scope
https://scrapingant.com/proxies provides free proxies for connecting to the web.
*/
// module.exports.getProxyServer = async () => {
//   const proxyServers = [
//     "http://52.66.117.126:48759",
//     "http://103.89.233.226:82",
//     "http://13.127.90.57:7890",
//     "http://103.89.233.226:83",
//     "http://103.89.233.226:84",
//     // Other proxy servers
//   ];
//   return proxyServers[Math.floor(Math.random() * proxyServers.length)];
// };
