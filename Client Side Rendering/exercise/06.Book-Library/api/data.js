import * as api from "./api.js";

const endpoints = {
  allBooks: "/jsonstore/collections/books",
  booksById: "/jsonstore/collections/books/",
};

export async function loadBooks() {
  return api.get(endpoints.allBooks);
}

export async function createBook(book) {
  return api.post(endpoints.allBooks, book);
}

export async function getBook(id) {
  return api.get(endpoints.booksById + id);
}

export async function updateBook(id, book) {
  return api.put(endpoints.booksById + id, book);
}

export async function deleteById(id) {
  return api.delete(endpoints.booksById + id);
}
