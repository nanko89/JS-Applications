async function getRecipes() {
  let response = await fetch(
    "http://localhost:3030/jsonstore/cookbook/recipes"
  );
  return Object.values(await response.json());
}

async function getRecipeById(id) {
  let response = await fetch(
    "http://localhost:3030/jsonstore/cookbook/details/" + id
  );
  return await response.json();
}

function createRecipePreview(recipe) {
  let article = e("article", "");
  article.classList.add("preview");
  article.addEventListener("click", toggleCard);

  let divTitle = e("div", "", article);
  divTitle.classList.add("title");
  e("h2", `${recipe.name}`, divTitle);

  let divSmall = e("div", "", article);
  divSmall.classList.add("small");
  let img = e("img", "", divSmall);
  img.setAttribute("src", `${recipe.img}`);

  return article;

  async function toggleCard() {
    debugger;
    const fullRecipe = await getRecipeById(recipe._id);

    article.replaceWith(createRecipeCard(fullRecipe));
  }
}

function createRecipeCard(recipe) {
  let article = e("article", "");
  e("h2", recipe.name, article);

  let divBand = e("div", "", article);
  divBand.classList.add("band");

  let divTumb = e("div", "", divBand);

  let img = e("img", "", divTumb);
  img.setAttribute("src", `${recipe.img}`);

  let divIngredients = e("div", "", divBand);
  divIngredients.classList.add("ingredients");
  e("h3", "Ingredients:", divIngredients);

  let ul = e("ul", "", divIngredients);
  recipe.ingredients.map(i => e("li", `${i}`, ul));

  let divDescription = e("div", "", article);
  divDescription.classList.add("description");
  e("h3", "Preparation:", divDescription);
  recipe.steps.map(s => e("p", `${s}`, divDescription));

  return article;
}

window.addEventListener("load", async () => {
  const main = document.querySelector("main");

  const recipes = await getRecipes();
  const cards = recipes.map(createRecipePreview);

  main.innerHTML = "";
  cards.forEach(c => main.appendChild(c));
});

function e(type, content, parent) {
  const element = document.createElement(type);
  element.textContent = content;

  if (parent) {
    parent.appendChild(element);
  }
  return element;
}
