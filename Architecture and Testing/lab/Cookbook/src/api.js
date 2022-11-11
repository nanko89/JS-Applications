import * as request from "./request.js";

const baseUrl = "http://localhost:3030";
const recipesUrl = `${baseUrl}/data/recipes`;
const loginUrl = `${baseUrl}/users/login`;

export const getRecipes = () => request.get(recipesUrl);

export const createRecipe = data => {
  return request.post(recipesUrl, data);
};

export const createLogin = data => {
  return request.post(loginUrl, data);
};

export const saveUser = user => {
  localStorage.setItem("user", JSON.stringify(user));
};
