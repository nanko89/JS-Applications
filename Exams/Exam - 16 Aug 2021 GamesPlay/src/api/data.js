import { get, post, put, del } from "./api.js";

const endpoints = {
  gameById: "/data/games/",
  games: "/data/games",
  home: "/data/games?sortBy=_createdOn%20desc&distinct=category",
  catalog: "/data/games?sortBy=_createdOn%20desc",
};

export async function getAll() {
  return get(endpoints.home);
}

export async function getAllCategory() {
  return get(endpoints.catalog);
}

export async function getById(id) {
  return get(endpoints.gameById + id);
}

export async function create(data) {
  return post(endpoints.games, data);
}

export async function edit(id, data) {
  return put(endpoints.gameById + id, data);
}

export async function deleteItem(id) {
  return del(endpoints.gameById + id);
}
