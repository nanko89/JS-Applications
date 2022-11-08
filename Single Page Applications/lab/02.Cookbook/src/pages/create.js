import { getToken } from "../auth.js";

const createSection = document.querySelector(".create");
const createForm = createSection.querySelector("form");

createForm.addEventListener("submit", e => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const name = formData.get("name");
  const img = formData.get("img");
  const ingredients = formData.get("ingredients").split("\n");
  const steps = formData.get("steps").split("\n");
  const body = { name, img, ingredients, steps };

  fetch("http://localhost:3030/data/recipes", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Autorization": getToken(),
    },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .then(data => {
      alert("Successful recipe create ");
    });
});

export function renderCreate() {
  createSection.style.display = "block";
}
