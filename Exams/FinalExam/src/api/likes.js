import { get, post } from "./api.js";

export async function like(data) {
  return post("/data/likes", data);
}
export async function totalLike(albumId) {
  return get(
    `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`
  );
}
export async function myLikes(albumId, userId) {
  return get(
    `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}
