import { getAllIdeas } from "../api/data.js";

const section = document.querySelector("#dashboard-holder");
section.addEventListener("click", onDetailsSelect);

let ctx = null;

export async function showCatalog(contex) {
  ctx = contex;
  contex.showSection(section);
  const ideas = await getAllIdeas();
  if (ideas.length == 0) {
    section.innerHTML = "<h1>No ideas yet! Be the first one :)</h1>";
  } else {
    section.replaceChildren(...ideas.map(idea => createIdeaPreview(idea)));
  }
}

function createIdeaPreview(idea) {
  const element = document.createElement("div");
  element.className = "card overflow-hidden current-card details";
  element.style.width = "20rem";
  element.style.height = "18rem";
  element.innerHTML = `
  <div class="card-body">
      <p class="card-text">${idea.title}</p>
  </div>
  <img class="card-image" src="${idea.img}">
  <a data-id=${idea._id} class="btn" href="/details">Details</a>`;

  return element;
}

function onDetailsSelect(e) {
  if (e.target.tagName == "A") {
    e.preventDefault();
    const id = e.target.dataset.id;
    if (id) {
      ctx.goTo("/details", id);
    }
  }
}
