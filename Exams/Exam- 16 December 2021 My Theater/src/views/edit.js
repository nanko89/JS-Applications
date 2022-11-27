import { html } from "../lib.js";
import { getById, editEvent } from "../api/data.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (onEdit, ev) => html` <section id="editPage">
  <form @submit=${onEdit} class="theater-form">
    <h1>Edit Theater</h1>
    <div>
      <label for="title">Title:</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Theater name"
        .value=${ev.title}
      />
    </div>
    <div>
      <label for="date">Date:</label>
      <input
        id="date"
        name="date"
        type="text"
        placeholder="Month Day, Year"
        .value=${ev.date}
      />
    </div>
    <div>
      <label for="author">Author:</label>
      <input
        id="author"
        name="author"
        type="text"
        placeholder="Author"
        .value=${ev.author}
      />
    </div>
    <div>
      <label for="description">Theater Description:</label>
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        .value=${ev.description}
      ></textarea>
    </div>
    <div>
      <label for="imageUrl">Image url:</label>
      <input
        id="imageUrl"
        name="imageUrl"
        type="text"
        placeholder="Image Url"
        value="${ev.imageUrl}"
      />
    </div>
    <button class="btn" type="submit">Submit</button>
  </form>
</section>`;

export async function showEdit(ctx) {
  const id = ctx.params.id;
  const ev = await getById(id);
  debugger;
  ctx.render(editTemplate(createSubmitHandler(onEdit), ev));

  async function onEdit({ title, date, author, description, imageUrl }) {
    if (!title || !date || !author || !description || !imageUrl) {
      return alert("All fields are required!");
    }
    await editEvent(id, { title, date, author, imageUrl, description });
    ctx.page.redirect("/details/" + id);
  }
}
