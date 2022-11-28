import { login } from "../api/user.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const loginTemplate = onLogin => html``;

export function showLogin(ctx) {
  ctx.render(loginTemplate(createSubmitHandler(onLogin)));

  async function onLogin({ email, password }) {
    if (!email || !password) {
      return alert("All fields are required!");
    }

    await login(email, password);

    ctx.updateNav();
    ctx.page.redirect("/");
  }
}
