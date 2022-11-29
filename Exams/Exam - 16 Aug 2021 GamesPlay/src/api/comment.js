import { get, post } from "./api.js";

export async function getComment(gameId) {
  return get(`/data/comments?where=gameId%3D%22${gameId}%22`);
}

export async function postComment(data) {
  return post("/data/comments", data);
}
