import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";
import { logout } from "../api/user.js";

const root = document.querySelector("header");

const navTemplate = user => html` <h1>
    <a class="home" href="/">GamesPlay</a>
  </h1>
  <nav>
    <a href="/catalog">All games</a>
    ${user
      ? html` <div id="user">
          <a href="/create">Create Game</a>
          <a @click=${onLogout} href="#">Logout</a>
        </div>`
      : html`<div id="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>`}
  </nav>`;

export function updateNav() {
  const user = getUserData();
  render(navTemplate(user), root);
}

function onLogout() {
  logout();
  updateNav();
  page.redirect("/");
}
