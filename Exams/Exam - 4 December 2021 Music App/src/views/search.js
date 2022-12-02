import { search } from "../api/data.js";
import { html, nothing } from "../lib.js";
import { getUserData } from "../util.js";
const cardTemplate = (song, isUser) => html` <div class="card-box">
  <img src=${song.imgUrl} />
  <div>
    <div class="text-center">
      <p class="name">Name: ${song.name}</p>
      <p class="artist">Artist: ${song.artist}</p>
      <p class="genre">Genre: ${song.genre}</p>
      <p class="price">Price: $${song.price}</p>
      <p class="date">Release Date: ${song.releaseDate}</p>
    </div>
    ${isUser
      ? html` <div class="btn-group">
          <a href="/catalog/${song._id}" id="details">Details</a>
        </div>`
      : nothing}
  </div>
</div>`;

const searchTemplate = (onSearch, songs, isUser) => html`<section
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

  <div class="search-result">
    ${songs.length == 0
      ? html`<p class="no-result">No result.</p>`
      : html`${songs.map(s => cardTemplate(s, isUser))}`}
  </div>
</section>`;

export async function showSearch(ctx) {
  const user = await getUserData();
  const isUser = user ? true : false;
  let songs = [];
  ctx.render(searchTemplate(onSearch, songs, isUser));

  async function onSearch(e) {
    e.preventDefault();
    const input = document.querySelector("#search-input");
    if (!input.value) {
      return alert("Invalid input!");
    }
    songs = await search(input.value);
    ctx.render(searchTemplate(onSearch, songs, isUser));
  }
}
