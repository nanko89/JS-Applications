import { html, nothing } from "../lib.js";
import { deleteItem, getById } from "../api/data.js";
import { getUserData } from "../util.js";

const detailsTemplate = (onDelete, isOwner, song) => html` <section
  id="detailsPage"
>
  <div class="wrapper">
    <div class="albumCover">
      <img src=${song.imgUrl} />
    </div>
    <div class="albumInfo">
      <div class="albumText">
        <h1>Name: ${song.name}</h1>
        <h3>Artist: ${song.artist}</h3>
        <h4>Genre: ${song.genre}</h4>
        <h4>Price: $${song.price}</h4>
        <h4>Date: ${song.releaseDate}</h4>
        <p>Description: ${song.description}</p>
      </div>
      ${isOwner
        ? html`<div class="actionBtn">
            <a href="/edit/${song._id}" class="edit">Edit</a>
            <a @click=${onDelete} href="#" class="remove">Delete</a>
          </div>`
        : nothing}
    </div>
  </div>
</section>`;

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const item = await getById(id);
  const user = await getUserData();
  const isOwner = user ? user._id == item._ownerId : false;

  ctx.render(detailsTemplate(onDelete, isOwner, item));

  async function onDelete() {
    const agree = confirm("Are you sure you want to delete this event?");
    if (agree) {
      await deleteItem(ctx.params.id);
      ctx.page.redirect("/catalog");
    }
  }
}
