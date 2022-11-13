const navBar = document.querySelector("nav");
const guestNavigation = navBar.querySelectorAll(".guest");
const userNavigation = navBar.querySelectorAll(".user");
const welcomeMsg = navBar.querySelector("#welcome-msg");

export function updateAuth() {
  let serializedUser = localStorage.getItem("user");

  if (serializedUser) {
    userNavigation.forEach(li => (li.style.display = "inline"));
    guestNavigation.forEach(li => (li.style.display = "none"));

    let email = JSON.parse(serializedUser).email;
    welcomeMsg.textContent = `Welcome, ${email}`;
  } else {
    guestNavigation.forEach(li => (li.style.display = "inline"));
    userNavigation.forEach(li => (li.style.display = "none"));
  }
}

export function logout() {
  localStorage.clear();
  updateAuth();
}

export function getToken() {
  let serializedUser = localStorage.getItem("user");

  if (serializedUser) {
    let user = JSON.parse(serializedUser);
    return user.accessToken;
  }
}
