export const get = url => {
  return fetch(url)
    .then(res => res.json())
    .catch(err => console.error(err));
};

export const post = (url, body) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .catch(err => console.error(err));
};
