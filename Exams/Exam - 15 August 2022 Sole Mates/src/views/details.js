import { html, nothing } from "../lib.js";
import { deleteItem, getById } from "../api/data.js";
import { getUserData } from "../util.js";

const detailsTemplate = (onDelete, isOwner, shoes) => html` <section
  id="details"
>
  <div id="details-wrapper">
    <p id="details-title">${shoes.title}</p>
    <div id="img-wrapper">
      <img src=${shoes.imageUrl} alt="example1" />
    </div>
    <div id="info-wrapper">
      <p>Brand: <span id="details-brand">${shoes.brand}</span></p>
      <p>Model: <span id="details-model">${shoes.model}</span></p>
      <p>Release date: <span id="details-release">${shoes.release}</span></p>
      <p>Designer: <span id="details-designer">${shoes.designer}</span></p>
      <p>Value: <span id="details-value">${shoes.value}</span></p>
    </div>

    <!--Edit and Delete are only for creator-->
    ${isOwner
      ? html`<div id="action-buttons">
          <a href="/edit/${shoes._id}" id="edit-btn">Edit</a>
          <a @click=${onDelete} href="#" id="delete-btn">Delete</a>
        </div>`
      : nothing}
  </div>
</section>`;

export async function showDetails(ctx) {
  const id = ctx.params.id;
  debugger;
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
