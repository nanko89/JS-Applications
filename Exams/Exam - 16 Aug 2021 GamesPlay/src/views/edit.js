import { getById, edit } from "../api/data.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (game, onEdit) => html` <section
  id="edit-page"
  class="auth"
>
  <form @submit=${onEdit} id="edit">
    <div class="container">
      <h1>Edit Game</h1>
      <label for="leg-title">Legendary title:</label>
      <input type="text" id="title" name="title" .value=${game.title} />

      <label for="category">Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        .value=${game.category}
      />

      <label for="levels">MaxLevel:</label>
      <input
        type="number"
        id="maxLevel"
        name="maxLevel"
        min="1"
        .value=${game.maxLevel}
      />

      <label for="game-img">Image:</label>
      <input
        type="text"
        id="imageUrl"
        name="imageUrl"
        .value=${game.imageUrl}
      />

      <label for="summary">Summary:</label>
      <textarea name="summary" id="summary" .value=${game.summary}></textarea>
      <input class="btn submit" type="submit" value="Edit Game" />
    </div>
  </form>
</section>`;

export async function showEdit(ctx) {
  const id = ctx.params.id;
  const game = await getById(id);

  ctx.render(editTemplate(game, createSubmitHandler(onEdit)));

  async function onEdit({ title, category, maxLevel, imageUrl, summary }) {
    if (!title || !category || !maxLevel || !imageUrl || !summary) {
      return alert("All fields are required!");
    }

    await edit(id, {
      title,
      category,
      maxLevel,
      imageUrl,
      summary,
    });

    ctx.page.redirect("/");
  }
}
