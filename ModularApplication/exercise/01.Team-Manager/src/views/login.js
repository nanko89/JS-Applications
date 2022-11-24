import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../data/auth.js";
import { createSubmitHandler } from "../util.js";

const loginTemplate = (onLogin, error) => html` <section id="login">
  <article class="narrow">
    <header class="pad-med">
      <h1>Login</h1>
    </header>
    <form @submit=${onLogin} id="login-form" class="main-form pad-large">
      ${error ? html`<div class="error">${error}</div>` : nothing}
      <label>E-mail: <input type="text" name="email" /></label>
      <label>Password: <input type="password" name="password" /></label>
      <input class="action cta" type="submit" value="Sign In" />
    </form>
    <footer class="pad-small">
      Don't have an account?
      <a href="/register" class="invert">Sign up here</a>
    </footer>
  </article>
</section>`;

export function showLogin(ctx) {
  ctx.render(loginTemplate(createSubmitHandler(onLogin, "")));

  async function onLogin({ email, password }) {
    if (!email || !password) {
      ctx.render(
        loginTemplate(createSubmitHandler(onLogin), "All fields are require!")
      );
      return;
    }
    const data = await login(email, password);

    if (typeof data !== "object") {
      ctx.render(loginTemplate(createSubmitHandler(onLogin), data));
      return;
    }
    ctx.page.redirect("/my-teams");
  }
}
