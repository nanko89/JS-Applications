import { html } from "../node_modules/lit-html/lit-html.js";
import { until } from "../node_modules/lit-html/directives/until.js";
import { getById } from "../src/data/recipes.js";

const detailsTemplate = recipe => html` <h2>${recipe.name}</h2>
  <img src="${"/" + recipe.img}" />
  <h3>Ingredients</h3>
  <ul>
    ${recipe.ingredients.map(i => html`<li>${i}</li>`)}
  </ul>
  <h3>Steps</h3>
  <ul>
    ${recipe.steps.map(s => html`<li>${s}</li>`)}
  </ul>`;

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const recipe = await getById(id);
  ctx.render(until(loadRecipes(id), html`<p>Loading &hellip;</p>`));
}

async function loadRecipes(id) {
  const recipe = await getById(id);
  return detailsTemplate(recipe);
}
