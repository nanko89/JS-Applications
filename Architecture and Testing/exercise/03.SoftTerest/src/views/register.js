import { register } from "../api/users.js";

const section = document.querySelector("#registerPage");
const form = section.querySelector("form");
form.addEventListener("submit", onSubmit);

const loginBtn = section.querySelector("a");
loginBtn.addEventListener("click", onLoginPage);

let ctx = null;

export function showRegister(contex) {
  ctx = contex;
  contex.showSection(section);
}

function onLoginPage(e) {
  e.preventDefault();
  ctx.goTo("/login");
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);

  const email = formData.get("email");
  const password = formData.get("password");
  const rePass = formData.get("repeatPassword");

  if (!email || !password || password != rePass) {
    return alert("Invalid data");
  }
  await register(email, password);
  form.reset();
  ctx.updateNav();
  ctx.goTo("/");
}
