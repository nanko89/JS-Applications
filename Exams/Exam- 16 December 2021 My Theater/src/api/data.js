import { get, post, put, del } from "./api.js";

const endpoints = {
  homeItem: "/data/theaters?sortBy=_createdOn%20desc&distinct=title",
  itemById: "/data/theaters/",
  allItem: "/data/theaters",
};

export async function getAll() {
  return get(endpoints.homeItem);
}

export async function getById(id) {
  return get(endpoints.itemById + id);
}

export async function createEvent(data) {
  return post(endpoints.allItem, data);
}

export async function editEvent(id, data) {
  return put(endpoints.itemById + id, data);
}

export async function deleteEvent(id) {
  return del(endpoints.itemById + id);
}

export async function getProfileInfo(userId) {
  return get(
    `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
  );
}
