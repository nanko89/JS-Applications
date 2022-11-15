import { createIdea } from "../api/data.js";

const section = document.querySelector("#createPage");
const form = section.querySelector("form");
form.addEventListener("submit", onSubmit);

let ctx = null;
export function showCreate(contex) {
  ctx = contex;
  contex.showSection(section);
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);

  const title = formData.get("title");
  const description = formData.get("description");
  const img = formData.get("imageURL");

  if (!title || !description || !img) {
    return alert("Invalid data");
  }

  await createIdea({
    title,
    description,
    img,
  });

  ctx.goTo("/catalog");
}
