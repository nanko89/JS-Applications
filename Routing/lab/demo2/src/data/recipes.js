import { get } from "./api.js";

const endpoints = {
  recipes: "/data/recipes",
  recipeById: "/data/recipes/",
};

export async function getAll() {
  return get(endpoints.recipes);
}

export async function getById(id) {
  return get(endpoints.recipeById + id);
}
