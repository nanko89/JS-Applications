window.onload = onLoadHTML();
window.addEventListener("DOMContentLoaded", onLoadHTML);

document.querySelector("#addForm").addEventListener("submit", createCatch);

function onLoadHTML() {
  const guestElements = document.querySelector("#guest");
  const userElements = document.querySelector("#user");
  const addBtn = document.querySelector(".add");
  const nameP = document.querySelector("p span");

  //Logout
  const logoutBtn = document.querySelector("#logout");
  logoutBtn.addEventListener("click", e => {
    e.preventDefault();
    sessionStorage.clear();
    location.reload();
  });

  document.querySelectorAll("a").forEach(a => a.classList.remove("active"));
  document.getElementById("home").classList.add("active");

  const email = sessionStorage.getItem("email");
  if (email) {
    userElements.style.display = "inline-block";
    guestElements.style.display = "none";
    nameP.textContent = email;
    addBtn.disabled = false;
  } else {
    userElements.style.display = "none";
    guestElements.style.display = "inline-block";
    nameP.textContent = "guest";
    addBtn.disabled = true;
  }
}

function createCatch(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  onCreateCatch(data);
}

async function onCreateCatch(body) {
  const url = "http://localhost:3030/data/catches ";

  const headers = getHeader("POST", body);
  const response = await fetch(url, headers);

  const data = response.json();
}

function getHeader(method, body) {
  const token = sessionStorage.getItem("accessToken");
  return {
    method: `${method}`,
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(body),
  };
}
