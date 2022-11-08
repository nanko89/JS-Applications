import { router } from "./router.js";
import { updateAuth } from "./auth.js";

updateAuth();
router("/");
const navElement = document.querySelector(".navigation");

navElement.addEventListener("click", e => {
  e.preventDefault();
  if (e.target.tagName == "A") {
    const url = new URL(e.target.href);

    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    router(url.pathname);
  }
});
