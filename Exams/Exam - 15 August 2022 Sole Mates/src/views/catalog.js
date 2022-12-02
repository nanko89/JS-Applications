import { html } from "../lib.js";
import { getAll } from "../api/data.js";

const cardTemplate = card => html`
  <li class="card">
    <img src="${card.imageUrl}" alt="travis" />
    <p><strong>Brand: </strong><span class="brand">${card.brand}</span></p>
    <p><strong>Model: </strong><span class="model">${card.model}</span></p>
    <p><strong>Value:</strong><span class="value">${card.value}</span>$</p>
    <a class="details-btn" href="/catalog/${card._id}">Details</a>
  </li>
`;

const catalogTemplate = cards => html` <section id="dashboard">
  <h2>Collectibles</h2>
  ${cards.length == 0
    ? html` <h2>There are no items added yet.</h2> `
    : html`<ul class="card-wrapper">
        ${cards.map(cardTemplate)}
      </ul>`}
</section>`;

export async function showCatalog(ctx) {
  const cards = await getAll();
  ctx.render(catalogTemplate(cards));
}
