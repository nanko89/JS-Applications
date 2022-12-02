import { clearUserData, setUserData } from "../util.js";
import { get, post } from "./api.js";

const endpoint = {
  login: "/users/login",
  register: "/users/register",
  logout: "/users/logout",
};

export async function login(email, password) {
  const user = await post(endpoint.login, { email, password });
  setUserData(user);
}

export async function register(email, password, username, gender) {
  const user = await post(endpoint.register, {
    email,
    password,
    username,
    gender,
  });
  setUserData(user);
}

export async function logout() {
  get(endpoint.logout);
  clearUserData();
}
