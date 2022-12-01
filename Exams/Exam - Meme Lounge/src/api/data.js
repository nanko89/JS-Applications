import { get, post, put, del } from "./api.js";

const endpoints = {
  memesById: "/data/memes/",
  memes: "/data/memes",
  allMemes: "/data/memes?sortBy=_createdOn%20desc",
};

export async function getAll() {
  return get(endpoints.allMemes);
}

export async function getById(id) {
  return get(endpoints.memesById + id);
}

export async function create(data) {
  return post(endpoints.memes, data);
}

export async function edit(id, data) {
  return put(endpoints.memesById + id, data);
}

export async function deleteItem(id) {
  return del(endpoints.memesById + id);
}

export async function myMemes(userId) {
  return get(
    `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
  );
}
