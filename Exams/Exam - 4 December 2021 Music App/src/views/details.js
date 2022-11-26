import { html, nothing } from "../lib.js";
import { deleteAlbum, getById } from "../api/data.js";
import { getUserData } from "../util.js";

const detailsTemplate = (album, user, onDelete) => html` <section
  id="detailsPage"
>
  <div class="wrapper">
    <div class="albumCover">
      <img src=${album.imgUrl} />
    </div>
    <div class="albumInfo">
      <div class="albumText">
        <h1>Name: ${album.name}</h1>
        <h3>Artist: ${album.artist}</h3>
        <h4>Genre: ${album.genre}</h4>
        <h4>Price: $${album.price}</h4>
        <h4>Date: ${album.date}</h4>
        <p>Description: ${album.description}</p>
      </div>

      ${user
        ? html`<div class="actionBtn">
            <a href="/edit/${album._id}" class="edit">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="remove"
              >Delete</a
            >
          </div>`
        : nothing}
    </div>
  </div>
</section>`;

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const album = await getById(id);
  const user = await getUserData();
  const isOwner = user._id == album._ownerId;
  ctx.render(detailsTemplate(album, isOwner, onDelete));

  async function onDelete() {
    const choice = confirm("Are you sure you want to delete album?");
    if (choice) {
      await deleteAlbum(id);
      ctx.page.redirect("/catalog");
    }
  }
}
