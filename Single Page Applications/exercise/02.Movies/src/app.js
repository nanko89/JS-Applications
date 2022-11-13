import { updateAuth } from "./auth.js";
import { router } from "./nav.js";

updateAuth();
router("/");
const navElement = document.querySelector(".navbar");

navElement.addEventListener("click", e => {
  e.preventDefault();
  if (e.target.tagName == "A") {
    const url = new URL(e.target.href);

    router(url.pathname);
  }
});
