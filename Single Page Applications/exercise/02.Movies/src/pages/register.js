import { viewPage } from "../nav.js";
import { updateAuth } from "../auth.js";
import { register } from "../api.js";
import { showHome } from "./home.js";

const registerSection = document.querySelector("#form-sign-up");
const form = registerSection.querySelector("form");

form.addEventListener("submit", onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const email = formData.get("email");
  const password = formData.get("password");
  const repeatPassword = formData.get("repeatPassword");

  if (
    !email ||
    !password ||
    !repeatPassword ||
    password != repeatPassword ||
    password.length < 6
  ) {
    alert("All fields are required");
    return;
  }

  await register({ email, password });
  updateAuth();
  showHome();
}

export function renderRegister() {
  viewPage(registerSection);
}
