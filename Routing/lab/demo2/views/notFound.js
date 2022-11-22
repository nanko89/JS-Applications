import { html } from "../node_modules/lit-html/lit-html.js";

const notFoundTemplate = () => html`<h2>Not Found 404</h2>`;
export function notFound(ctx) {
  ctx.render(notFoundTemplate());
}
