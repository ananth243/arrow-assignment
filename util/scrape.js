const puppeteer = require("puppeteer");
const { config } = require("dotenv");
const currency = require("currency.js");
const { generateRandomUA } = require("./common");

config();

const FUNDING = (org) =>
  `https://www.crunchbase.com/search/funding_rounds/field/organizations/num_funding_rounds/${org}`;
const EXEC = (org) => `https://www.crunchbase.com/organization/${org}/people`;

const getFunding = async (browser, org) => {
  const page = await browser.newPage();
  // await page.setUserAgent(generateRandomUA());
  await page.goto(FUNDING(org), {
    waitUntil: "domcontentloaded",
  });
  let funding = await page.evaluate(() => {
    const rows = document.querySelectorAll("grid-row");
    let details = [];
    rows.forEach((row) => {
      const type = row
        .querySelector("grid-cell:nth-child(4)")
        .querySelector("span").innerText;
      const amount = row
        .querySelector("grid-cell:nth-child(5)")
        .querySelector("span").innerText;
      const date = row
        .querySelector("grid-cell:nth-child(6)")
        .querySelector("span").innerText;
      details.push({ type, amount, date });
    });
    return details;
  });
  if(funding.length === 0) return null;
  funding = funding.map(({ type, amount, date }) => {
    return { type, amount: currency(amount).intValue/100, date: new Date(date) };
  });
  return funding;
};

const getExecutives = async (browser, org) => {
  const page = await browser.newPage();
  // await page.setUserAgent(generateRandomUA());
  await page.goto(EXEC(org), {
    waitUntil: "domcontentloaded",
  });
  return await page.evaluate(() => {
    delete navigator.__proto__.webdriver;
    let arr = [];
    document
      .querySelector("image-list-card")
      .querySelectorAll("li")
      .forEach((li) => {
        const name = li.querySelector("a").innerText;
        const post = li.querySelector("span").innerText;
        arr.push({ name, post });
      });
      if(arr.length === 0) return null;
    return arr;
  });
};

module.exports.scrapeData = async (org) => {
  const browser = await puppeteer.launch({
    headless: process.env.HEADLESS || false,
  });
  const funding = await getFunding(browser, org);
  const execs = await getExecutives(browser, org);
  await browser.close();
  return { org, funding, execs };
};