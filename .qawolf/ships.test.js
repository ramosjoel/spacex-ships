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

test("ships", async () => {
  await page.goto(process.env.BASE_URL);
  await page.click('[data-tid="ship-header--gomstree"]');
  await page.click('[data-tid="ship-header--gopursuit"]');
  await qawolf.scroll(page, "html", { x: 0, y: 281 });
  await page.click('[data-tid="ship-header--americanchampion"]');
  await qawolf.scroll(page, "html", { x: 0, y: 593 });
  await page.click('[data-tid="ship-header--goquest"]');
  await qawolf.scroll(page, "html", { x: 0, y: 957 });
  await page.click('[data-tid="ship-header--gonavigator"]');
  await qawolf.scroll(page, "html", { x: 0, y: 1298 });
  await page.click('[data-tid="ship-header--jrti-2"]');
  await qawolf.scroll(page, "html", { x: 0, y: 1597 });
  await page.click('[data-tid="ship-header--nrcquest"]');
  await qawolf.scroll(page, "html", { x: 0, y: 1926 });
  await page.click('[data-tid="ship-header--ocisly"]');
  await qawolf.scroll(page, "html", { x: 0, y: 2213 });
  await page.click('[data-tid="ship-header--pacificwarrior"]');
  await qawolf.scroll(page, "html", { x: 0, y: 2536 });
  await page.click('[data-tid="ship-header--pacificfreedom"]');
  await qawolf.scroll(page, "html", { x: 0, y: 2864 });
});