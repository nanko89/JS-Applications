import { html, nothing } from "../lib.js";
import { deleteItem, getById } from "../api/data.js";
import { getUserData } from "../util.js";

const detailsTemplate = (onDelete, isOwner, item) => html``;

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
