import { page, render } from "./lib.js";
import { showProfile } from "./views/profile.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { updateNav } from "./views/nav.js";
import { showRegister } from "./views/register.js";

const main = document.querySelector("main");

page(decorateContext);
page("/", showHome);
page("/login", showLogin);
page("/register", showRegister);
page("/create", showCreate);
page("/profile/:id", showProfile);
page("/details/:id", showDetails);
page("/edit/:id", showEdit);

updateNav();
page.start();

function decorateContext(ctx, next) {
  ctx.render = renderMain;
  ctx.updateNav = updateNav;
  next();
}

function renderMain(content) {
  render(content, main);
}
