import { get, post, put, del } from "./api.js";
const endpoints = {
  byId: "/data/catches/",
  all: "/data/catches",
};

export async function getAll() {
  return get(endpoints.all);
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
