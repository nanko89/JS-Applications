window.onload = attachEvents;

const loadBooks = document.querySelector("#loadBooks");
const tbody = document.querySelector("tbody");
const form = document.querySelector("form");

const url = "http://localhost:3030/jsonstore/collections/books/";
tbody.innerHTML = "";
function attachEvents() {
  loadBooks.addEventListener("click", reloadData);
  form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSubmit(formData);
  });
}

async function reloadData() {
  const response = await fetch(url);
  const data = await response.json();
  tbody.innerHTML = "";

  Object.entries(data).forEach(book => {
    const tr = e("tr", "", tbody);
    tr.setAttribute("id", `${book[0]}`);
    e("td", `${book[1].title}`, tr);
    e("td", `${book[1].author}`, tr);

    const action = e("td", "", tr);
    const editBtn = e("button", "Edit", action);
    const deleteBtn = e("button", "Delete", action);

    editBtn.addEventListener("click", onEditBook);
    deleteBtn.addEventListener("click", onDeleteBook);
  });
}

async function onSubmit(formData) {
  changeName("FORM");
  let title = formData.get("title");
  let author = formData.get("author");

  if (!title || !author) {
    return alert("Invalid input");
  }

  if (sessionStorage.getItem("id")) {
    const id = sessionStorage.getItem("id");
    const title = document.querySelector('input[name="title"]').value;
    const author = document.querySelector('input[name="author"]').value;

    if (!title || !author) {
      return alert("Invalid input");
    }
    await fetch(url + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author }),
    });
    sessionStorage.clear();
  } else {
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author }),
    });
  }
  reloadData();
  document.querySelector('input[name="author"]').value = "";
  document.querySelector('input[name="title"]').value = "";
}

async function onEditBook(e) {
  changeName("Edit FORM");
  const editBook = e.target.parentElement.parentElement;
  const title = editBook.querySelector("td").textContent;
  const author = editBook.querySelectorAll("td")[1].textContent;
  const titleInput = document.querySelector('input[name="title"]');
  const authorInput = document.querySelector('input[name="author"]');

  titleInput.value = title;
  authorInput.value = author;
  const id = editBook.getAttribute("id");
  sessionStorage.setItem("id", id);
}

async function onDeleteBook(e) {
  const removeElement = e.target.parentElement.parentElement;

  const id = removeElement.getAttribute("id");
  removeElement.remove();
  await fetch(url + id, {
    method: "delete",
  });
}

function e(type, content, parent) {
  const element = document.createElement(type);
  element.textContent = content;
  if (parent) {
    parent.appendChild(element);
  }
  return element;
}

function changeName(h3) {
  if (h3 === "FORM") {
    document.querySelector("form h3").textContent = "FORM";
    document.querySelector("form button").textContent = "Submit";
  } else {
    document.querySelector("form h3").textContent = "Edit FORM";
    document.querySelector("form button").textContent = "Save";
  }
}
