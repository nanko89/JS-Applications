import { get, post, put, del } from "./api.js";

const endpoints = {
  itemById: "/data/cars/",
  items: "/data/cars",
  allCars: "/data/cars?sortBy=_createdOn%20desc",
};

export async function getAll() {
  return get(endpoints.allCars);
}

export async function getById(id) {
  return get(endpoints.itemById + id);
}

export async function create(data) {
  return post(endpoints.items, data);
}

export async function edit(id, data) {
  return put(endpoints.itemById + id, data);
}

export async function deleteItem(id) {
  return del(endpoints.itemById + id);
}

export async function myListings(userId) {
  return get(
    `${endpoints.items}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
  );
}

export async function serchByYear(year) {
  return get(`${endpoints.items}?where=year%3D${year}`);
}
