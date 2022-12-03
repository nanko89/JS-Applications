import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";
import { logout } from "../api/user.js";

const root = document.querySelector("header");

const navTemplate = user => html` <h1><a href="/">Orphelp</a></h1>
  <nav>
    <a href="/">Dashboard</a>
    ${user
      ? html`<div id="user">
          <a href="/my-posts">My Posts</a>
          <a href="/create">Create Post</a>
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
