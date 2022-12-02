import { get, post, put, del } from "./api.js";

//Update path
const endpoints = {
  byId: "/data/shoes/",
  all: "/data/shoes",
  dashboard: "/data/shoes?sortBy=_createdOn%20desc",
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

export async function search(query) {
  debugger 
  const result = get(`/data/shoes?where=brand%20LIKE%20%22${query}%22`);
  return result
}
