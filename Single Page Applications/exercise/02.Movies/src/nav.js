import { showHome } from "./pages/home.js";
import { renderLogin } from "./pages/login.js";
import { renderLogout } from "./pages/logout.js";
import { renderRegister } from "./pages/register.js";

const routes = {
  "/": showHome,
  "/login": renderLogin,
  "/register": renderRegister,
  "/logout": renderLogout,
};

const container = document.querySelector("#container");
const viewSections = document.querySelectorAll(".view-section");

export function router(path) {
  const renderer = routes[path];
  renderer();
}

function skipSection() {
  viewSections.forEach(section => section.remove());
}

export function viewPage(page) {
  skipSection();
  container.appendChild(page);
}
