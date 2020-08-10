const qawolf = require("qawolf");
require('dotenv').config()

let browser;
let page;

beforeAll(async () => {
  browser = await qawolf.launch();
  const context = await browser.newContext();
  await qawolf.register(context);
  page = await context.newPage();
});

afterAll(async () => {
  await qawolf.stopVideos();
  await browser.close();
});

test("navigation", async () => {
  await page.goto(process.env.BASE_URL);
  await page.click('css=[aria-label="Next item"]');
  await page.click('[data-tid="ship-header--bettyrgambarella"]');
});
