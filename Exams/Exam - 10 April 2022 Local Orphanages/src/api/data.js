import { get, post, put, del } from "./api.js";
//Update path
const endpoints = {
  byId: "/data/posts/",
  all: "/data/posts",
  dashboard: '/data/posts?sortBy=_createdOn%20desc'
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

export async function getMyPosts(userId){
  return get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}