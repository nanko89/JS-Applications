import { html } from "../node_modules/lit-html/lit-html.js";
export const table = onload => html` <button id="loadBooks" @click=${onload}>
    LOAD ALL BOOKS
  </button>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>`;
export const tbody = (currentBook, onEdit, onDelete) => {
  const id = currentBook[0];
  const book = currentBook[1];
  return html` <tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>
      <button @click=${() => onEdit(id)}>Edit</button>
      <button @click=${() => onDelete(id)}>Delete</button>
    </td>
  </tr>`;
};
