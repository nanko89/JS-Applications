import { html, nothing, render } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../data/auth.js";
import { createSubmitHandler } from "../util.js";

const registerTemplate = (onRegister, error) => html` <section id="register">
  <article class="narrow">
    <header class="pad-med">
      <h1>Register</h1>
    </header>
    <form @submit=${onRegister} id="register-form" class="main-form pad-large">
      ${error ? html`<div class="error">${error}</div>` : nothing}
      <label>E-mail: <input type="text" name="email" /></label>
      <label>Username: <input type="text" name="username" /></label>
      <label>Password: <input type="password" name="password" /></label>
      <label>Repeat: <input type="password" name="repass" /></label>
      <input class="action cta" type="submit" value="Create Account" />
    </form>
    <footer class="pad-small">
      Already have an account? <a href="#" class="invert">Sign in here</a>
    </footer>
  </article>
</section>`;

export function showRegister(ctx) {
  renderError();

  function renderError(message) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister), message));
  }

  async function onRegister({ email, username, password, repass }) {
    if (!email || !username || !password || !repass) {
      renderError("All fields are require!");
      return;
    }
    const validRegex = /^[\w\d.!#$%&'*+/=?^_`{|}~-]+@[\w\d]+(?:\.[\w\d]+)*$/g;
    debugger;
    if (!email.match(validRegex)) {
      renderError("Invalid email address!");
      return;
    }

    if (username.length < 3) {
      renderError("Username must be more than 3 symbol!");
      return;
    }

    if (password.length < 3) {
      renderError("Password must be more than 3 symbol!");
      return;
    }

    if (password !== repass) {
      renderError("Confirm Password not match!");
      return;
    }

    const data = await register(email, username, password, repass);

    if (typeof data !== "object") {
      renderError(data);
      return;
    }

    ctx.page.redirect("/my-teams");
  }
}
