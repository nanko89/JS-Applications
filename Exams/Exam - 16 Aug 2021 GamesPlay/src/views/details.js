import { html } from "../lib.js";

const detailsTemplate = () => html``;

export async function showDetails(ctx) {
  ctx.render(detailsTemplate());
}
