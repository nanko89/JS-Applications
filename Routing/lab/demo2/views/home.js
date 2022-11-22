import { html } from "../node_modules/lit-html/lit-html.js";

const homeTemplate = () =>
  html`<h2>Home Page</h2>
    <button>Click Me</button>`;

export function showHome(ctx) {
  ctx.render(homeTemplate());
  document.querySelector("button").addEventListener("click", () => {
    ctx.page.redirect("/contact");
  });
}
