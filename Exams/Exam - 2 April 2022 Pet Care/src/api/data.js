import { get, post, put, del } from "./api.js";

export async function getAll() {
  return get("/data/pets?sortBy=_createdOn%20desc&distinct=name");
}

export async function getById(id) {
  return get("/data/pets/" + id);
}

export async function deleteById(id) {
  return del("/data/pets/" + id);
}

export async function createPet(data) {
  return post("/data/pets", data);
}

export async function editPet(id, data) {
  return put("/data/pets/" + id, data);
}
