import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";
import { logout } from "../api/user.js";

const root = document.querySelector("header");

const navTemplate = user => html` <nav>
  <section class="logo">
    <img src="./images/logo.png" alt="logo" />
  </section>
  <ul>
    <!--Users and Guest-->
    <li><a href="/">Home</a></li>
    <li><a href="/catalog">Dashboard</a></li>
    ${user
      ? html` <li><a href="/create">Create Postcard</a></li>
          <li><a @click=${onLogout} href="#">Logout</a></li>`
      : html` <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>`}
  </ul>
</nav>`;

export async function updateNav() {
  const user = await getUserData();
  render(navTemplate(user), root);
}

function onLogout() {
  logout();
  updateNav();
  page.redirect("/");
}
