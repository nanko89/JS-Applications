import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../data/auth.js";
import { createSubmitHandler } from "../util.js";

const loginTemplate = onSubmit => html` <h2>Login</h2>
  <form @submit=${onSubmit}>
    <label>Email:<input type="text" name="email" /></label>
    <label>Password:<input type="password" name="password" /></label>
    <button>Login</button>
  </form>`;

export function showLogin(ctx) {
  ctx.render(loginTemplate(createSubmitHandler(onSubmit)));

  async function onSubmit({ email, password }) {
    await login(email, password);

    ctx.page.redirect("/recipes");
  }
}
