import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";
import { logout } from "../api/user.js";

const root = document.querySelector("nav");

const navTemplate = user => html`
  <a href="/catalog">All Memes</a>
  ${user
    ? html`<div class="user">
        <a href="/create">Create Meme</a>
        <div class="profile">
          <span>Welcome, ${user.email}</span>
          <a href="/my-profile">My Profile</a>
          <a @click=${onLogout} href="#">Logout</a>
        </div>
      </div>`
    : html`<div class="guest">
        <div class="profile">
          <a href="/login">Login</a>
          <a href="register">Register</a>
        </div>
        <a class="active" href="/">Home Page</a>
      </div>`}
`;

export function updateNav() {
  const user = getUserData();
  render(navTemplate(user), root);
}

function onLogout() {
  logout();
  updateNav();
  page.redirect("/");
}
