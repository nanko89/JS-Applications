import { html, render } from "../node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";

const rootTowns = document.querySelector("#towns");
const result = document.querySelector("#result");
const submitBtn = document.querySelector("button");
let activeTown = [];

submitBtn.addEventListener("click", search);
renderHtml();

function search() {
  const input = document.querySelector("#searchText");
  const inputTown = input.value;
  activeTown = towns.filter(t => t.includes(inputTown));
  let matches = activeTown.length;

  if (input.value === "") {
    matches = 0;
  }

  renderHtml();

  result.textContent = `${matches} matches found`;
}

function renderHtml() {
  const ul = html` <ul>
    ${towns.map(t => html`<li class=${isActive(t) ? "active" : ""}>${t}</li>`)}
  </ul>`;

  render(ul, rootTowns);
}

function isActive(townName) {
  return activeTown.includes(townName);
}
