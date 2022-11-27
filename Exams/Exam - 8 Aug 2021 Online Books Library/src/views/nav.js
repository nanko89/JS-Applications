import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";
import { logout } from "../api/user.js";

const root = document.querySelector("nav");

const navTemplate = user => html` <section class="navbar-dashboard">
  <a href="/">Dashboard</a>
  ${user
    ? html`<div id="user">
        <span>Welcome, ${user.email}</span>
        <a class="button" href="/my-book/${user._id}">My Books</a>
        <a class="button" href="/create">Add Book</a>
        <a @click=${onLogout} class="button" href="javascript:void(0)"
          >Logout</a
        >
      </div>`
    : html`<div id="guest">
        <a class="button" href="/login">Login</a>
        <a class="button" href="/register">Register</a>
      </div>`}
</section>`;

export function updateNav() {
  const user = getUserData();
  render(navTemplate(user), root);
}

function onLogout() {
  logout();
  updateNav();
  page.redirect("/");
}
