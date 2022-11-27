import { register } from "../api/user.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const registerTemplate = onRegister => html``;

export function showRegister(ctx) {
  ctx.render(registerTemplate(createSubmitHandler(onRegister)));

  async function onRegister({ email, password, repeatPassword }) {
    if (!email || !password || !repeatPassword) {
      return alert("All field are require!");
    }

    if (password !== repeatPassword) {
      return alert("Password don't match!");
    }

    await register(email, password);

    ctx.updateNav();
    ctx.page.redirect("/");
  }
}
