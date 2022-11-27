import { get, post, put, del } from "./api.js";

const endpoints = {
  itemById: "/data/books/",
  items: "/data/books",
};

export async function getAll() {
  return get(endpoints.booksDashboard);
}

export async function getById(id) {
  return get(endpoints.itemById + id);
}

export async function create(data) {
  return post(endpoints.books, data);
}

export async function edit(id, data) {
  return put(endpoints.itemById + id, data);
}

export async function deleteItem(id) {
  return del(endpoints.itemById + id);
}
