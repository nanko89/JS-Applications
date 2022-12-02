import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";
import { logout } from "../api/user.js";

const root = document.querySelector("header");

const navTemplate = user => html` <h1>Biggest Catch</h1>
  <nav>
    <a id="home" href="/" class="active">Home</a>
    ${user
      ? html`<div id="user">
            <a @click=${onLogout} id="logout" href="javascript:void(0)"
              >Logout</a
            >
          </div>
          <p class="email">Welcome, <span>${user.email}</span></p> `
      : html` <div id="guest">
          <a id="login" href="/login">Login</a>
          <a id="register" href="/register">Register</a>
        </div>`}
  </nav>`;

export function updateNav() {
  const user = getUserData();
  render(navTemplate(user), root);
}

function onLogout() {
  logout();
  updateNav();
  location.reload();
}
