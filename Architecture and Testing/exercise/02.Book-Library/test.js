const { chromium } = require("playwright-chromium");
const { expect } = require("chai");
const url =
  "http://127.0.0.1:5500/Architecture%20and%20Testing/exercise/02.Book-Library/";

describe("E2E tests", async function () {
  this.timeout(10000);
  let browser, page;
  before(async () => {
    browser = await chromium.launch();
  });
  after(async () => {
    await browser.close();
  });
  beforeEach(async () => {
    page = await browser.newPage();
  });
  afterEach(async () => {
    await page.close();
  });

  it("loads all books", async function () {
    await page.goto(url);

    await page.click("text=Load All Books");
    await page.waitForSelector("text=Harry Potter");

    const rows = await page.$$eval("tbody tr", rows =>
      rows.map(r => r.textContent)
    );

    expect(rows[0]).to.contains("Harry Potter");
    expect(rows[0]).to.contain("Rowling");
    expect(rows[1]).to.contains("C# Fundamentals");
    expect(rows[1]).to.contains("Nakov");
  });

  it("test add books", async function () {
    await page.goto(url);

    await page.fill("input[name=title]", "Title");
    await page.fill("input[name=author]", "Author");

    const [req] = await Promise.all([
      page.waitForRequest(req => req.method() == "POST"),
      page.click("text=Submit"),
    ]);

    const data = JSON.parse(req.postData());
    expect(data.title).to.equal("Title");
    expect(data.author).to.equal("Author");
  });
});
