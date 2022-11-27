import { searching } from "../api/data.js";
import { html, nothing } from "../lib.js";
import { getUserData } from "../util.js";

const cartTemplate = (item, user) => html` <div class="card-box">
  <img src="./images/BrandiCarlile.png" />
  <div>
    <div class="text-center">
      <p class="name">Name: ${item.name}</p>
      <p class="artist">Artist: ${item.artist}</p>
      <p class="genre">Genre: ${item.genre}</p>
      <p class="price">Price: ${item.price}</p>
      <p class="date">Release Date: ${item.releaseDate}</p>
    </div>
    ${user
      ? html`<div class="btn-group">
          <a href="/catalog/${item._id}" id="details">Details</a>
        </div>`
      : nothing}
  </div>
</div>`;

const searchTemplate = (onSearch, items, user) => html` <section
  id="searchPage"
>
  <h1>Search by Name</h1>

  <div class="search">
    <input
      id="search-input"
      type="text"
      name="search"
      placeholder="Enter desired albums's name"
    />
    <button @click=${onSearch} class="button-list">Search</button>
  </div>

  <h2>Results:</h2>

  <!--Show after click Search button-->

  ${items.length == 0
    ? html`<div class="search-result">
        <p class="no-result">No result.</p>
      </div>`
    : html`<div class="search-result">
        ${items.map(i => cartTemplate(i, user))}
      </div>`}
</section>`;

export async function showSearch(ctx) {
  let items = [];
  const user = getUserData();
  ctx.render(searchTemplate(onSearch, items, user));
  async function onSearch(e) {
    e.preventDefault();
    const search = e.target.parentElement.querySelector("#search-input");
    if (!search.value) {
      return alert("The data entered is empty!");
    }

    items = await searching(search.value);
    ctx.render(searchTemplate(onSearch, items, user));
    search.value = "";
  }
}
