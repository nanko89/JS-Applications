import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";
import { logout } from "../api/user.js";

const root = document.querySelector("header");

//Add @click to logout button
const navTemplate = user => html`
<a id="logo" href="/"
          ><img id="logo-img" src="./images/logo.png" alt=""
        /></a>
        <nav>
          <div>
            <a href="/catalog">Dashboard</a>
            <a href="/search">Search</a>
          </div>
    ${user ? html` <div class="user">
            <a href="/create">Add Pair</a>
            <a @click=${onLogout} href="#">Logout</a>
          </div>` : html` <div class="guest">
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
