document.getElementById("login-form").addEventListener("submit", loginHandler);

const guestElements = document.querySelector("#guest");
const userElements = document.querySelector("#user");

const email = sessionStorage.getItem("email");

document.querySelectorAll("a").forEach(a => a.classList.remove("active"));
document.getElementById("login").classList.add("active");

if (email) {
  window.location.href = "index.html";
  userElements.style.display = "inline-block";
  guestElements.style.display = "none";
} else {
  userElements.style.display = "none";
  guestElements.style.display = "inline-block";
}

const errorP = document.querySelector("p.notification");

function loginHandler(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { email, password } = Object.fromEntries(formData);

  onLogin(email, password);
}

async function onLogin(email, password) {
  const url = "http://localhost:3030/users/login";
  const body = { email, password };
  const header = getHeader("POST", body);
  const response = await fetch(url, header);
  const data = await response.json();

  sessionStorage.setItem("id", data._id);
  sessionStorage.setItem("email", data.email);
  sessionStorage.setItem("accessToken", data.accessToken);
  window.location = "./index.html";
}

function getHeader(method, body) {
  return {
    method: `${method}`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}
