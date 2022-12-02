import { post, get } from "./api.js";

export async function donate(data) {
  return post("/data/donation", data);
}

export async function canDonated(petId, userId) {
  return get(
    `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}

export async function totalDonate(petId) {
  return get(
    `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`
  );
}
