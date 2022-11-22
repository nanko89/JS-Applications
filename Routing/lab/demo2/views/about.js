import { html } from "../node_modules/lit-html/lit-html.js";

const aboutTemplate = () => html` <h2>About Us</h2>`;

export function showAboutUs(ctx) {
  debugger;
  ctx.render(aboutTemplate());
}
