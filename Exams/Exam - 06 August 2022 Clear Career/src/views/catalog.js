import { getAll } from "../api/data.js";
import { html } from "../lib.js";

const cartTemplate = offer => html` <div class="offer">
  <img src="${offer.imageUrl}" alt="example1" />
  <p><strong>Title: </strong><span class="title">${offer.title}</span></p>
  <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
  <a class="details-btn" href="/catalog/${offer._id}">Details</a>
</div>`;

const catalogTemplate = offers => html` <section id="dashboard">
  <h2>Job Offers</h2>

  ${offers.length == 0
    ? html`<h2>No offers yet.</h2>`
    : html`${offers.map(cartTemplate)}`}
</section>`;

export async function showCatalog(ctx) {
  const offers = await getAll();
  ctx.render(catalogTemplate(offers));
}
