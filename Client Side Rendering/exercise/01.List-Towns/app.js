import { html, render } from "../node_modules/lit-html/lit-html.js";

const root = document.querySelector("#root");
const form = document.querySelector("form");
form.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const input = formData.get("towns");
  const towns = input.split(", ");
  renderTowns(towns);
  form.reset();
}

function renderTowns(data) {
  const result = createTownList(data);
  render(result, root);
}

function createTownList(data) {
  const ul = html` <ul>
    ${data.map(el => html`<li>${el}</li>`)}
  </ul>`;
  return ul;
}
