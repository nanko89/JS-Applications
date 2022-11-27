import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";
import { logout } from "../api/user.js";

const root = document.querySelector("nav");

//Add @click to logout button
const navTemplate = user => html``;

export function updateNav() {
  const user = getUserData();
  render(navTemplate(user), root);
}

function onLogout() {
  logout();
  updateNav();
  page.redirect("/");
}
