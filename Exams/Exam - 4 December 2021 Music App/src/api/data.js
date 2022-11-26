import { get, post, put, del } from "./api.js";

const endpoints = {
  allItem: "/data/albums?sortBy=_createdOn%20desc&distinct=name",
  albums: "/data/albums",
  itemById: "/data/albums/",
};

export async function getAll() {
  return get(endpoints.allItem);
}

export async function getById(id) {
  return get(endpoints.itemById + id);
}

export async function createAlbum(data) {
  return post(endpoints.albums, data);
}

export async function editAlbum(id, data) {
  return put(endpoints.itemById + id, data);
}

export async function deleteAlbum(id) {
  return del(endpoints.itemById + id);
}

export async function searching(query) {
  return get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
}
