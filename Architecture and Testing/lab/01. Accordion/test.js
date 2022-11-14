const { chromium } = require("playwright-chromium");
const { expect } = require("chai");

let browser, page;

describe("E2E tests", async function () {
  this.timeout(8000);

  before(async () => {
    browser = await chromium.launch();
  });
  after(async () => await browser.close());
  beforeEach(async () => await browser.newPage());
  afterEach(async () => await page.close());

  it("test loads article title", async () => {
    await page.goto(
      "http://localhost:5500/Architecture%20and%20Testing/lab/01.%20Accordion/"
    );

    await page.waitForSelector("accordion");

    const content = await page.textContent("#main");

    expect(content).to.contain("Scalable Vector Graphics");
    expect(content).to.contain("Open standard");
    expect(content).to.contain("Unix");
    expect(content).to.contain("ALGOL");
  });

  it('test has working button "More"', async () => {
    await page.goto(
      "http://localhost:5500/Architecture%20and%20Testing/lab/01.%20Accordion/"
    );

    await page.click("text=More");
    await page.waitForSelector(".extra p");

    const visible = await page.isVisible(".extra p");
    const text = await page.textContent(".extra p");
    const btnLess = await page.textContent(".accordion >> button");

    expect(visible).to.be.true;
    expect(btnLess).to.equal("Less");
    expect(text).to.contain(
      "Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)-based vector image format for two-dimensional graphics with support for interactivity and animation."
    );
  });

  it('test has workin button "Less"', async () => {
    await page.goto(
      "http://localhost:5500/Architecture%20and%20Testing/lab/01.%20Accordion/"
    );

    await page.click("text=More");
    await page.waitForSelector(".extra p");
    await page.click(".accordion >> text=Less");

    expect(await page.isVisible(".extra p")).to.be.false;
    expect(await page.textContent(".accordion >> button")).to.equal("More");
  });
});
