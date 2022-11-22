import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { showAboutUs } from "../views/about.js";
import { showCatalog } from "../views/catalog.js";
import { showConact } from "../views/contact.js";
import { showDetails } from "../views/details.js";
import { showHome } from "../views/home.js";
import { notFound } from "../views/notFound.js";

const main = document.querySelector("main");

function decorateContex(ctx, next) {
  ctx.render = function (content) {
    render(content, main);
  };
  next();
}

page(decorateContex);
page("/index.html", "/");
page("/", showHome);
page("/recipes", showCatalog);
page("/recipes/:id", showDetails);
page("/about", showAboutUs);
page("/contact", showConact);
page("*", notFound);

page.start();
