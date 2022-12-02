import { getAll } from "../api/data.js";
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

const catalogTemplate = (songs, isUser) => html` <section id="catalogPage">
  <h1>All Albums</h1>

  ${songs.length == 0
    ? html` <p>No Albums in Catalog!</p>`
    : html`${songs.map(c => cardTemplate(c, isUser))}`}
</section>`;

export async function showCatalog(ctx) {
  const songs = await getAll();
  const user = await getUserData();
  const isUser = user ? true : false;
  ctx.render(catalogTemplate(songs, isUser));
}
