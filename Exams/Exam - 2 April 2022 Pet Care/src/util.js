export function setUserData(data) {
  sessionStorage.setItem("user", JSON.stringify(data));
}
export function getUserData() {
  const data = JSON.parse(sessionStorage.getItem("user"));
  return data;
}
export function clearUserData() {
  sessionStorage.removeItem("user");
}

export function createSubmitHandler(callback) {
  return function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = Object.fromEntries(formData);
    callback(data);
  };
}
