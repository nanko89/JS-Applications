import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { getUserData } from "./util.js";
import { showLogin } from "./views/login.js";
import { showHome } from "./views/home.js";
import { showRegister } from "./views/register.js";
import { showCreate } from "./views/create.js";
import { showBrowse } from "./views/browse.js";
import { showMyTeams } from "./views/my-team.js";
import { showEdit } from "./views/edit.js";
import { showOverlay } from "./views/overlay.js";
import { addMemeberToTeam, approveMemberShip, logout } from "./data/auth.js";
import { removeMember, showDetails } from "./views/details.js";

const main = document.querySelector("main");
const nav = document.querySelector("nav");

const navTemplate = user => html` <a href="/teams" class="action"
    >Browse Teams</a
  >
  ${user
    ? html` <a href="/my-teams" class="action">My Teams</a>
        <a href="/logout" class="action">Logout</a>`
    : html`<a href="/login" class="action">Login</a>
        <a href="/register" class="action">Register</a>`}`;

function onLogout(ctx) {
  logout();
  ctx.page.redirect("/");
}

function session(ctx, next) {
  const user = getUserData();

  if (user) {
    ctx.user = user;
  }

  next();
}

function decorateContex(ctx, next) {
  render(navTemplate(ctx.user), nav);

  ctx.render = function (content) {
    render(content, main);
  };

  next();
}

page(session);
page(decorateContex);
page("/index.html", "/");
page("/", showHome);
page("/login", showLogin);
page("/logout", onLogout);
page("/register", showRegister);
page("/create", showCreate);
page("/edit/:id", showEdit);
page("/details/:id", showDetails);
page("/delete/:id", removeMember);
page("/add-member/:id/:teamId", addMemeberToTeam);
page("/approve/:id", approveMemberShip);
page("/teams", showBrowse);
page("/my-teams", showMyTeams);
page("*", showOverlay);

page.start();
