import page from "../node_modules/page/page.mjs";
import { html, nothing, render } from "../node_modules/lit-html/lit-html.js";
import { showAboutUs } from "../src/views/about.js";
import { showCatalog } from "../src/views/catalog.js";
import { showConact } from "../src/views/contact.js";
import { showDetails } from "../src/views/details.js";
import { showHome } from "../src/views/home.js";
import { notFound } from "../src/views/notFound.js";
import { showLogin } from "./views/login.js";
import { getUserData } from "./util.js";
import { showCreate } from "./views/create.js";
import { logout } from "./data/auth.js";
import { showRegsiter } from "./views/register.js";

const main = document.querySelector("main");

const navTemplate = user => html`
  <a href="/">Home</a>
  <a href="/recipes">Catalog</a>
  ${user ? html`<a href="/create">Create</a>` : nothing}
  <a href="/about">About</a>
  ${user
    ? html`<span>Welcome, ${user.username}</span><a href="/logout">Logout</a>`
    : html`<a href="/login">Login</a> <a href="/register">Register</a>`}
`;

function onLogout(ctx) {
  logout();
  ctx.page.redirect("/");
}

function decorateContex(ctx, next) {
  render(navTemplate(ctx.user), document.querySelector("nav"));

  ctx.render = function (content) {
    render(content, document.querySelector("main"));
  };
  next();
}

function parseQuery(ctx, next) {
  ctx.query = {};

  if (ctx.querystring) {
    const query = Object.fromEntries(
      ctx.querystring.split("&").map(e => e.split("="))
    );

    Object.assign(ctx.query, query);
  }

  next();
}

function session(ctx, next) {
  const user = getUserData();
  if (user) {
    ctx.user = user;
  }

  next();
}

page(session);
page(decorateContex);
page(parseQuery);
page("/index.html", "/");
page("/", showHome);
page("/recipes", showCatalog);
page("/recipes/:id", showDetails);
page("/create", showCreate);
page("/about", showAboutUs);
page("/contact", showConact);
page("/login", showLogin);
page("/register", showRegsiter);
page("/logout", onLogout);
page("*", notFound);

page.start();
