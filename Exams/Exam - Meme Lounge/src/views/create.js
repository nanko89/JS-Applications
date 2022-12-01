import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";
import { create } from "../api/data.js";
import { notification } from "./notification.js";

const creatTemplate = onCreate => html`
  <section id="create-meme">
    <form @submit=${onCreate} id="create-form">
      <div class="container">
        <h1>Create Meme</h1>
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title" />
        <label for="description">Description</label>
        <textarea
          id="description"
          placeholder="Enter Description"
          name="description"
        ></textarea>
        <label for="imageUrl">Meme Image</label>
        <input
          id="imageUrl"
          type="text"
          placeholder="Enter meme ImageUrl"
          name="imageUrl"
        />
        <input type="submit" class="registerbtn button" value="Create Meme" />
      </div>
    </form>
  </section>
`;

export async function showCreate(ctx) {
  ctx.render(creatTemplate(createSubmitHandler(onCreate)));

  async function onCreate({ title, description, imageUrl }) {
    if (!title || !description || !imageUrl) {
      return notification("All fields are require");
    }

    await create({ title, description, imageUrl });

    ctx.page.redirect("/catalog");
  }
}
