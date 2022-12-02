import { html } from "../lib.js";
import { edit, getById } from "../api/data.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (shoes, onEdit) => html`
  <section id="edit">
    <div class="form">
      <h2>Edit item</h2>
      <form @submit=${onEdit} class="edit-form">
        <input
          type="text"
          name="brand"
          id="shoe-brand"
          placeholder="Brand"
          .value=${shoes.brand}
        />
        <input
          type="text"
          name="model"
          id="shoe-model"
          placeholder="Model"
          .value=${shoes.model}
        />
        <input
          type="text"
          name="imageUrl"
          id="shoe-img"
          placeholder="Image url"
          .value=${shoes.imageUrl}
        />
        <input
          type="text"
          name="release"
          id="shoe-release"
          placeholder="Release date"
          .value=${shoes.release}
        />
        <input
          type="text"
          name="designer"
          id="shoe-designer"
          placeholder="Designer"
          .value=${shoes.designer}
        />
        <input
          type="text"
          name="value"
          id="shoe-value"
          placeholder="Value"
          .value=${shoes.value}
        />

        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

export async function showEdit(ctx) {
  const id = ctx.params.id;
  const shoes = await getById(id);
  ctx.render(editTemplate(shoes, createSubmitHandler(onEdit)));

  async function onEdit({ brand, model, imageUrl, release, designer, value }) {
    if (!brand || !model || !imageUrl || !release || !designer || !value) {
      return alert("All fields are require");
    }
    await edit(id, { brand, model, imageUrl, release, designer, value });
    ctx.page.redirect("/catalog");
  }
}
