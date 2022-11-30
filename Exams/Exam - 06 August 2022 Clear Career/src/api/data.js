import { get, post, put, del } from "./api.js";
//Update path
const endpoints = {
  byId: "/data/offers/",
  all: "/data/offers",
  catalog: "/data/offers?sortBy=_createdOn%20desc",
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
