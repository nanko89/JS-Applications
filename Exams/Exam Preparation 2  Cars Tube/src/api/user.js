import { clearUserData, setUserData } from "../util.js";
import { get, post } from "./api.js";

const endpoint = {
  login: "/users/login",
  register: "/users/register",
  logout: "/users/logout",
};

export async function login(username, password) {
  const {
    _id,
    username: reusltEmail,
    accessToken,
  } = await post(endpoint.login, {
    username,
    password,
  });
  setUserData({ _id, username: reusltEmail, accessToken });
}

export async function register(username, password) {
  const {
    _id,
    username: reusltEmail,
    accessToken,
  } = await post(endpoint.register, {
    username,
    password,
  });
  setUserData({ _id, username: reusltEmail, accessToken });
}

export async function logout() {
  get(endpoint.logout);
  clearUserData();
}
