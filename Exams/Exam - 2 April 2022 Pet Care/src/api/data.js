import { get, post, put, del } from "./api.js";
const endpoints = {
  byId: "/data/pets/",
  all: "/data/pets",
  dashboard: "/data/pets?sortBy=_createdOn%20desc&distinct=name",
};

export async function getAll() {
  return get(endpoints.dashboard);
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
