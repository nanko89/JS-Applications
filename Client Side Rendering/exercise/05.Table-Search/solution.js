import { html, render } from "../node_modules/lit-html/lit-html.js";

const url = "http://localhost:3030/jsonstore/advanced/table";
const tbody = document.querySelector("tbody");
const activeRows = [];

loadContent();
solve();

function solve() {
  document.querySelector("#searchBtn").addEventListener("click", onClick);
  const searchField = document.querySelector("#searchField");

  function onClick(e) {
    e.preventDefault();

    Array.from(tbody.querySelectorAll("tr")).forEach(row => {
      let rowInfo = Array.from(row.children)
        .map(child => child.textContent)
        .join(" ");

      rowInfo.toLowerCase().includes(searchField.value.toLowerCase())
        ? row.classList.add("select")
        : row.classList.remove("select");
    });

    searchField.value = "";
  }
}

async function loadContent() {
  const responce = await fetch(url);
  const data = await responce.json();
  const options = Object.values(data).map(item => htmlOptions(item));
  render(options, tbody);
}

function htmlOptions(student) {
  return html` <tr>
    <td>${student.firstName} ${student.lastName}</td>
    <td>${student.email}</td>
    <td>${student.course}</td>
  </tr>`;
}
