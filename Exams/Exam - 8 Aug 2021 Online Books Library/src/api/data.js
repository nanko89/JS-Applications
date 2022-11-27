import { get, post, put, del } from "./api.js";

const endpoints = {
  myBooks: userId =>
    `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
  booksDashboard: "/data/books?sortBy=_createdOn%20desc",
  itemById: "/data/books/",
  books: "/data/books",
};

export async function getAll() {
  return get(endpoints.booksDashboard);
}

export async function getById(id) {
  return get(endpoints.itemById + id);
}

export async function getMyBooks(id) {
  return get(endpoints.myBooks(id));
}

export async function createBook(data) {
  return post(endpoints.books, data);
}

export async function editBook(id, data) {
  return put(endpoints.itemById + id, data);
}

export async function deleteBook(id) {
  return del(endpoints.itemById + id);
}
