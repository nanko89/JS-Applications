import { getById, deleteItem } from "../api/data.js";
import { html, nothing } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (meme, isOwner, onDelete) => html` <section
  id="meme-details"
>
  <h1>Meme Title: ${meme.title}</h1>
  <div class="meme-details">
    <div class="meme-img">
      <img alt="meme-alt" src=${meme.imageUrl} />
    </div>
    <div class="meme-description">
      <h2>Meme Description</h2>
      <p>${meme.description}</p>
      ${isOwner
        ? html`
            <a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button @click=${onDelete} class="button danger">Delete</button>
          `
        : nothing}
    </div>
  </div>
</section>`;

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const meme = await getById(id);
  const user = await getUserData();
  const isOwner = user ? user._id == meme._ownerId : false;
  ctx.render(detailsTemplate(meme, isOwner, onDelete));

  async function onDelete() {
    const agree = confirm("Are you sure you want to delete this event?");
    if (agree) {
      await deleteItem(id);
      ctx.page.redirect("/catalog");
    }
  }
}
