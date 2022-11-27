import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";
import { logout } from "../api/user.js";

const root = document.querySelector("nav");

//Add @click to logout button
const navTemplate = user => html` <a href="/">Theater</a>
  <ul>
    ${user
      ? html` <li><a href="/profile/${user._id}">Profile</a></li>
          <li><a href="/create">Create Event</a></li>
          <li><a @click=${onLogout} href="javascript:void(0)">Logout</a></li>`
      : html`<li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>`}
  </ul>`;

export function updateNav() {
  const user = getUserData();
  render(navTemplate(user), root);
}

function onLogout() {
  logout();
  updateNav();
  page.redirect("/");
}
