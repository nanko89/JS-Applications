import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";
import { logout } from "../api/user.js";

const root = document.querySelector("nav");

//Add @click to logout button
const navTemplate = user => html`
  <a class="active" href="/">Home</a>
  <a href="/catalog">All Listings</a>
  <a href="/search">By Year</a>
  ${user
    ? html` <div id="profile">
        <a>Welcome ${user.username}</a>
        <a href="/my-listings">My Listings</a>
        <a href="/create">Create Listing</a>
        <a @click=${onLogout} href="javascript:void(0)">Logout</a>
      </div>`
    : html`<div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
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
