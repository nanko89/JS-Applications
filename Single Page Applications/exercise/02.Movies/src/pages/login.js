import { updateAuth } from "../auth.js";
import { login } from "../api.js";
import { viewPage } from "../nav.js";
import { showHome } from "./home.js";

const sectionFormLogin = document.querySelector("#form-login");
const loginForm = sectionFormLogin.querySelector("form");

loginForm.addEventListener("submit", onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  let formData = new FormData(e.currentTarget);
  let email = formData.get("email");
  let password = formData.get("password");

  if (!email || !password) {
    alert("All filds are require.");
    return;
  }

  await login({ email, password });
  updateAuth();
  loginForm.reset();
  showHome();
}

export function renderLogin() {
  viewPage(sectionFormLogin);
}
