import { register } from "../api/user.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const registerTemplate = onRegister => html` <section id="register-view">
  <h2>Register</h2>
  <form @submit=${onRegister} id="register">
    <label>Email: <input type="text" name="email" /></label>
    <label>Password: <input type="password" name="password" /></label>
    <label>Repeat: <input type="password" name="rePass" /></label>
    <p class="notification"></p>
    <button>Register</button>
  </form>
</section>`;

export function showRegister(ctx) {
  ctx.render(registerTemplate(createSubmitHandler(onRegister)));

  async function onRegister({ email, password, rePass }) {
    if (!email || !password || !rePass) {
      return alert("All field are require!");
    }

    if (password !== rePass) {
      return alert("Password don't match!");
    }

    await register(email, password);

    ctx.updateNav();
    ctx.page.redirect("/");
  }
}
