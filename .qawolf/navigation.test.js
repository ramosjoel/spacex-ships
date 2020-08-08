const qawolf = require("qawolf");

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
  await page.goto("https://spacex-ships.now.sh/");
  await qawolf.scroll(page, "html", { x: 0, y: 3016 });
  await page.click('css=[aria-label="Pagination Navigation"] >> text=2');
  await qawolf.scroll(page, "html", { x: 0, y: 0 });
});