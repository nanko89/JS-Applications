import { logout } from "../auth.js";
import { showHome } from "./home.js";

export function renderLogout() {
  logout();
  showHome();
}
