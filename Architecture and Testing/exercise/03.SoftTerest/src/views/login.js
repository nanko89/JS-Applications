import { login } from "../api/users.js";

const section = document.querySelector("#loginPage");

const form = section.querySelector("form");
form.addEventListener("submit", onSubmit);

const registerBtn = section.querySelector("a");
registerBtn.addEventListener("click", onRegisterPage);

let ctx = null;

export function showLogin(contex) {
  ctx = contex;
  contex.showSection(section);
}

function onRegisterPage(e) {
  e.preventDefault();
  ctx.goTo("/register");
}

async function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData(form);

  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return alert("Invalid data");
  }

  await login(email, password);
  form.reset();
  ctx.updateNav();
  ctx.goTo("/");
}
