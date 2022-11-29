import { getAllCategory as getAllGamesCatalog } from "../api/data.js";
import { html } from "../lib.js";

const cartTemplate = game => html` <div class="allGames">
  <div class="allGames-info">
    <img src=${game.imageUrl} />
    <h6>${game.category}</h6>
    <h2>${game.title}</h2>
    <a href="/catalog/${game._id}" class="details-button">Details</a>
  </div>
</div>`;

const catalogTemplate = games => html` <section id="catalog-page">
  <h1>All Games</h1>
  ${games.length == 0
    ? html`<h3 class="no-articles">No articles yet</h3>`
    : html`${games.map(cartTemplate)}`}
</section>`;

export async function showCatalog(ctx) {
  const games = await getAllGamesCatalog();
  ctx.render(catalogTemplate(games));
}
