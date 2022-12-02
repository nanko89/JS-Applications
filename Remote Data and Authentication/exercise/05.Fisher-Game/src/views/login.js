import { login } from "../api/user.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const loginTemplate = onLogin => html` <section id="login-view">
  <h2>Login</h2>
  <form @submit=${onLogin} id="login">
    <label>Email: <input type="text" name="email" /></label>
    <label>Password: <input type="password" name="password" /></label>
    <p class="notification"></p>
    <button>Login</button>
  </form>
</section>`;

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
