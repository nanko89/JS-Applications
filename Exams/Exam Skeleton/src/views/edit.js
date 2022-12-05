import { html } from "../lib.js";
import { edit, getById } from "../api/data.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (meme, onEdit) => html``;

export async function showEdit(ctx) {
  // const id = ctx.params.id;
  // const meme = await getById(id);
  //   ctx.render(editTemplate(meme, createSubmitHandler( onEdit)));
  // async function onEdit({ title, description, imageUrl }) {
  //   if (!title || !description || !imageUrl) {
  //     return alert("All fields are require");
  //   }
  //   await edit(id, { title, description, imageUrl });
  //   ctx.page.redirect("/catalog");
  // }
}
