import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { showCatalog } from "./views/catalog.js";
import { showDetails } from "./views/details.js";
import { showCreate } from "./views/create.js";
import { initialize } from "./router.js";
import { logout } from "./api/users.js";

document.getElementById("views").remove();

const links = {
  "/": showHome,
  "/login": showLogin,
  "/register": showRegister,
  "/catalog": showCatalog,
  "/details": showDetails,
  "/create": showCreate,
  "/logout": onLogout,
};

const router = initialize(links);
router.updateNav();

router.goTo("/");

function onLogout() {
  logout();
  router.updateNav();
  router.goTo("/");
}
