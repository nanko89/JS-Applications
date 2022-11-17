import { html, render } from "../node_modules/lit-html/lit-html.js";

const url = "http://localhost:3030/jsonstore/advanced/dropdown";
const menu = document.querySelector("#menu");
const item = document.querySelector("#itemText");
const submitBtn = document.querySelector("input[type=submit]");
submitBtn.addEventListener("click", addItem);
loadContent();

async function addItem(e) {
  e.preventDefault();
  if (item.value !== "") {
    const body = { text: item.value };

    const responce = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "applicatin/json",
      },
      body: JSON.stringify(body),
    });

    if (responce.ok) {
      item.value = "";
      loadContent();
    }
  }
}

async function loadContent() {
  const responce = await fetch(url);
  const data = await responce.json();
  const options = Object.values(data).map(item => renderOptions(item));
  render(options, menu);
}

function renderOptions(item) {
  return html`<option value="${item._id}">${item.text}</option>`;
}
