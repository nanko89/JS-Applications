import { getAll } from "../api/data.js";
import { html } from "../lib.js";
const cardTemplate = card => html` <div class="post">
  <h2 class="post-title">${card.title}</h2>
  <img class="post-image" src="${card.imageUrl}" alt="Material Image" />
  <div class="btn-wrapper">
    <a href="/details/${card._id}" class="details-btn btn">Details</a>
  </div>
</div>`;

const homeTemplate = cards => html` <section id="dashboard-page">
  <h1 class="title">All Posts</h1>

  ${cards.length == 0
    ? html` <h1 class="title no-posts-title">No posts yet!</h1> `
    : html`<div class="all-posts">${cards.map(cardTemplate)}</div>`}
</section>`;

export async function showHome(ctx) {
  const cards = await getAll();
  ctx.render(homeTemplate(cards));
}
