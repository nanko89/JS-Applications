import { getToken } from "./auth.js";

export const get = async url => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    return await res.json();
  } catch (err) {
    console.error(err.message);
  }
};

export const post = async (url, body) => {
  debugger;
  const token = getToken();
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  if (token) {
    options.headers["X-Authorization"] = token;
  }

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
    if (!localStorage.getItem("user")) {
      const user = await res.json();
      localStorage.setItem("user", JSON.stringify(user));
    }
  } catch (err) {
    alert(err.message);
  }
};

export const del = url => {
  const token = getToken();

  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  });
};

export const put = async (url, body) => {
  const token = getToken();
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
  } catch (err) {
    alert(err.message);
    throw err;
  }
};
