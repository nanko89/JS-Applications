import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";
import { logout } from "../api/user.js";

const root = document.querySelector("header");

const navTemplate = user => html` <nav>
  <section class="logo">
    <img src="./images/logo.png" alt="logo" />
  </section>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/catalog">Dashboard</a></li>
    ${!user
      ? html`<li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>`
      : html` <li><a href="/create">Create Postcard</a></li>
          <li>
            <a @click=${onLogout} href="javascript:void(0)">Logout</a>
          </li>`}
  </ul>
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
