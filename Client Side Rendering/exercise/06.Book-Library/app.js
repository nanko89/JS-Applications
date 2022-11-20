import { render } from "../node_modules/lit-html/lit-html.js";
import { table, tbody } from "./views/table.js";
import { createForm } from "./views/create.js";
import * as api from "./api/data.js";
import { editForm } from "./views/edit.js";

const body = document.querySelector("body");
let id;
createBook();

function createBook() {
  render([table(rowsUpdate), createForm(onSubmit)], body);
}

async function rowsUpdate() {
  const allBooks = Object.entries(await api.loadBooks()).map(book =>
    tbody(book, onEdit, onDelete)
  );
  render(allBooks, document.querySelector("tbody"));
}

async function onEdit(e) {
  render([table(rowsUpdate), editForm(onSave)], body);

  id = e;
  const book = await api.getBook(e);
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");

  title.value = book.title;
  author.value = book.author;
}

async function onDelete(e) {
  api.deleteById(e);
  rowsUpdate();
}

async function onSubmit(e) {
  e.preventDefault();
  const form = document.querySelector("form");
  const formData = new FormData(form);
  const title = formData.get("title");
  const author = formData.get("author");
  if (!title || !author) {
    return alert("Invalid data!");
  }
  const body = { author, title };
  api.createBook(body);
  rowsUpdate();
  form.reset();
}

async function onSave(e) {
  e.preventDefault();
  const form = document.querySelector("form");
  const formData = new FormData(form);
  const title = formData.get("title");
  const author = formData.get("author");
  if (!title || !author) {
    return alert("Invalid data!");
  }
  const body = { author, title };
  debugger;
  api.updateBook(id, body);
  rowsUpdate();
  createBook();
}
