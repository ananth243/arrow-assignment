const clc = require("cli-color");

const logInRed = (obj) => console.log(clc.red(obj))
const logInBlue = (obj) => console.log(clc.blue(obj))

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

module.exports.displayData = (funds, execs) => {
  if (funds && funds.length > 0) {
    logInBlue("\n***********Funding Details***********")
    let fundingAmount = funds[0].dataValues.totalAmount;
    if (!fundingAmount)
      fundingAmount = funds.reduce(
        (acc, fund) => acc + parseInt(fund.amount),
        0
      );
    logInBlue(`Total Funding: ${this.formatNumber(fundingAmount)}`)
    logInBlue(`Funding rounds: ${funds.length}`)
    console.table(
      funds.map((fund) => ({
        type: fund.type,
        amount: this.formatNumber(Number(fund.amount)),
        date: fund.date.toDateString(),
      }))
    );
  } else logInRed("\nNo funding details available")
  if (execs && execs.length > 0) {
    logInBlue("\n***********Executive Details***********")
    logInBlue(`Number of executives: ${execs.length}`)
    console.table(
      execs.map((exec) => exec.toJSON()),
      ["name", "post"]
    );
  } else logInRed("No company executives available")
};
