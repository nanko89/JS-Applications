// window.onload = loadingPage();
window.addEventListener("DOMContentLoaded", loadingPage);

document.querySelector("#addForm").addEventListener("submit", createCatch);
document.querySelector(".load").addEventListener("click", loadHTMLData);

function loadingPage() {
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

async function loadHTMLData() {
  const url = "http://localhost:3030/data/catches";
  const divCatches = document.querySelector("#catches");
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error");
    }
    const data = await response.json();

    for (const item of data) {
      const div = htmlGenerator("div", "", divCatches, "", "catch", "");
      htmlGenerator("label", "Angler", div);
      htmlGenerator("input", "", div, "text", "angler", `${item.angler}`);
      htmlGenerator("label", "Weight", div);
      htmlGenerator("input", "", div, "text", "weight", `${item.weight}`);
      htmlGenerator("label", "Species", div);
      htmlGenerator("input", "", div, "text", "species", `${item.species}`);
      htmlGenerator("label", "Location", div);
      htmlGenerator("input", "", div, "text", "location", `${item.location}`);
      htmlGenerator("label", "Bait", div);
      htmlGenerator("input", "", div, "text", "bait", `${item.bait}`);
      htmlGenerator("label", "Capture Time", div);
      htmlGenerator(
        "input",
        "",
        div,
        "text",
        "captureTime",
        `${item.captureTime}`
      );

      const upadateBtn = htmlGenerator("button", "Update", div, "", "update");
      const deleteBtn = htmlGenerator("button", "Delete", div, "", "delete");

      upadateBtn.setAttribute("data-id", `${item._id}`);
      deleteBtn.setAttribute("data-id", `${item._id}`);

      const ownerId = sessionStorage.getItem("id");

      if (ownerId === item._ownerId) {
        upadateBtn.disabled = false;
        deleteBtn.disabled = false;
      } else {
        upadateBtn.disabled = true;
        deleteBtn.disabled = true;
      }

      upadateBtn.addEventListener("click", onUpdate);
      deleteBtn.addEventListener("click", onDelete);
    }
  } catch (err) {
    console.error(err.message);
  }
}

async function onUpdate(e) {
  const id = e.target.dataset.id;
  const url = `http://localhost:3030/data/catches/${id}`;
  const token = sessionStorage.getItem("accessToken");

  const inputFields = e.target.parentElement.querySelectorAll("input");
  const angler = inputFields[0].value;
  const weight = inputFields[0].value;
  const species = inputFields[0].value;
  const location = inputFields[0].value;
  const bait = inputFields[0].value;
  const captureTime = inputFields[0].value;
  const body = {
    angler,
    weight,
    species,
    location,
    bait,
    captureTime,
  };
  if (!angler || !weight || !species || !location || !bait || !captureTime) {
    errorP.textContent = "Error";
    setTimeout(() => {
      errorP.textContent = "";
    }, 2000);
  } else {
    await fetch(url, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify(body),
    });
  }
}

async function onDelete(e) {
  console.log(e.target.parentElement);
  const id = e.target.dataset.id;
  const url = `http://localhost:3030/data/catches/${id}`;
  const token = sessionStorage.getItem("accessToken");

  await fetch(url, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  });

  e.target.parentElement.remove();
}

function createCatch(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  onCreate(data);
}

async function onCreate(body) {
  const url = "http://localhost:3030/data/catches";

  const headers = getHeader("POST", body);
  const response = await fetch(url, headers);

  const data = response.json();
  document.getElementById("addForm").reset();
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

function htmlGenerator(tagName, content, parent, type, className, value) {
  const element = document.createElement(tagName);
  element.textContent = content;

  if (className) {
    element.className = className;
  }

  if (parent) {
    parent.appendChild(element);
  }

  if (type) {
    element.type = type;
  }

  if (value) {
    element.value = value;
  }
  return element;
}
