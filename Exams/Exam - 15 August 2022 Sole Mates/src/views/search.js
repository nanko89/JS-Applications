import { search } from "../api/data.js";
import { html, nothing } from "../lib.js";
import { getUserData } from "../util.js";

const cardTemplate = (card, isUser) => html` <li class="card">
  <img src="${card.imageUrl}" alt="travis" />
  <p><strong>Brand: </strong><span class="brand">${card.brand}</span></p>
  <p><strong>Model: </strong><span class="model">${card.model}</span></p>
  <p><strong>Value:</strong><span class="value">${card.value}</span>$</p>
  ${isUser
    ? html` <a class="details-btn" href="/catalog/${card._id}">Details</a>`
    : nothing}
</li>`;

const searchTemplate = (onSearch, cards, isUser) => html` <section id="search">
  <h2>Search by Brand</h2>

  <form @submit=${onSearch} class="search-wrapper cf">
    <input
      id="search-input"
      type="text"
      name="search"
      placeholder="Search here..."
      required
    />
    <button type="submit">Search</button>
  </form>

  <h3>Results:</h3>

  <div id="search-container">
    ${cards.length == 0
      ? html`<h2>There are no results found.</h2>`
      : html`<ul class="card-wrapper">
          ${cards.map(card => cardTemplate(card, isUser))}
        </ul>`}

    <!-- Display an h2 if there are no posts -->
  </div>
</section>`;

export async function showSearch(ctx) {
  const user = await getUserData();
  let cards = [];
  const isUser = user ? true : false;
  ctx.render(searchTemplate(onSearch, cards, isUser));

  async function onSearch(e) {
    e.preventDefault();
    debugger;
    const formData = new FormData(e.target);
    const input = formData.get("search");
    cards = await search(input);
    ctx.render(searchTemplate(onSearch, cards, isUser));
    formData.reset();
  }
}
