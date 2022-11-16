import { html, render } from "../node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";

const allCatsSection = document.querySelector("#allCats");
allCatsSection.addEventListener("click", onClick);

const catsTemplate = html`<ul>
  ${cats.map(c => createLiElement(c))}
</ul>`;

render(catsTemplate, allCatsSection);

function onClick(e) {
  if (e.target.tagName === "BUTTON") {
    debugger;
    const parent = e.target.parentElement;
    const statusDiv = parent.querySelector(".status");
    if (e.target.textContent === "Show status code") {
      e.target.textContent = "Hide status code";
      statusDiv.style.display = "block";
    } else {
      e.target.textContent = "Show status code";
      statusDiv.style.display = "none";
    }
  }
}

function createLiElement(cat) {
  return html` <li>
    <img
      src="./images/${cat.imageLocation}.jpg"
      width="250"
      height="250"
      alt="Card image cap"
    />
    <div class="info">
      <button class="showBtn">Show status code</button>
      <div class="status" style="display: none" id="100">
        <h4>Status Code: ${cat.statusCode}</h4>
        <p>${cat.statusMessage}</p>
      </div>
    </div>
  </li>`;
}
