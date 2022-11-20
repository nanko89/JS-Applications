import { html } from "../node_modules/lit-html/lit-html.js";

export const editForm = onSubmit => html` <form
  id="edit-form"
  @submit=${onSubmit}
>
  <input type="hidden" name="id" />
  <h3>Edit book</h3>
  <label>TITLE</label>
  <input type="text" id="title" name="title" placeholder="Title..." />
  <label>AUTHOR</label>
  <input type="text" id="author" name="author" placeholder="Author..." />
  <input type="submit" value="Save" />
</form>`;
