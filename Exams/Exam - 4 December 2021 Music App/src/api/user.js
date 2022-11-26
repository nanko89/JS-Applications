import { clearUserData, setUserData } from "../util.js";
import { get, post } from "./api.js";

const endpoint = {
  login: "/users/login",
  register: "/users/register",
  logout: "/users/logout",
};

export async function login(email, password) {
  const {
    _id,
    email: reusltEmail,
    accessToken,
  } = await post(endpoint.login, {
    email,
    password,
  });
  setUserData({ _id, email: reusltEmail, accessToken });
}

export async function register(email, password) {
  const {
    _id,
    email: reusltEmail,
    accessToken,
  } = await post(endpoint.register, {
    email,
    password,
  });
  setUserData({ _id, email: reusltEmail, accessToken });
}

export async function logout() {
  get(endpoint.logout);
  clearUserData();
}
