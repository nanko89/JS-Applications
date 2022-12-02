import { get, post, put, del } from "./api.js";
//Update path
const endpoints = {
  byId: "/data/albums/",
  all: "/data/albums",
  catalog: "/data/albums?sortBy=_createdOn%20desc&distinct=name",
};

export async function getAll() {
  return get(endpoints.catalog);
}

export async function getById(id) {
  return get(endpoints.byId + id);
}

export async function create(data) {
  return post(endpoints.all, data);
}

export async function edit(id, data) {
  return put(endpoints.byId + id, data);
}

export async function deleteItem(id) {
  return del(endpoints.byId + id);
}

export async function search (query){
  return get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
}