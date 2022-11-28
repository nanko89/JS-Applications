import { html } from "../lib.js";

const catalogTemplate = items => html``;

export async function showCatalog(ctx) {
  ctx.render(catalogTemplate(items));
}
