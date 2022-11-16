import { render } from "./template.js";

let username = "Peter";
let items = ["Product 1", "Product 2", "Product 3"];

const ctx = { username, items };

const views = {
  "home-link": "home",
  "catalog-link": "catalog",
  "about-link": "about",
};

document.querySelector("nav").addEventListener("click", e => {
  if (e.target.tagName == "A") {
    const view = views[e.target.id];
    if (view !== undefined) {
      render(view, ctx);
    }
  }
});
