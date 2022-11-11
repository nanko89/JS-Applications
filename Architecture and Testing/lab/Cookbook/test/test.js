const { chromium } = require("playwright-chromium");
const { expect } = require("chai");

const options = { headless: false, slowMo: 200 };
const url = "http://127.0.0.1:5500/Architecture%20and%20Testing/lab/Cookbook/";

describe("Custom test", function () {
  let browser, page;
  this.timeout(10000);

  before(async () => (browser = await chromium.launch(options)));
  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());
  after(async () => await browser.close());

  it("Successful login", async function () {
    await page.goto(url);

    await page.click('text="Login"');
    await page.fill("input[name=email]", "admin@abv.bg");
    await page.fill("input[name=password]", "admin");
    await page.click("input[value=Login]");
    let logoutBtn = await page.textContent("#logout-btn");

    expect(logoutBtn).to.be.equal("Logout");
  });

  it("Check result", async () => {
    await page.route("**/data/recipes", route =>
      route.fulfill({
        status: 200,
        body: "Gosho",
      })
    );
    await page.goto(url);
    const [response] = Promise.all([
      page.waitForResponse("**/data/recipes"),
      page.click(".active"),
    ]);
  });
});
