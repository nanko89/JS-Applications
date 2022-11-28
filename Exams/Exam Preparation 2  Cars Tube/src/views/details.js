import { deleteItem, getById } from "../api/data.js";
import { html, nothing } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (car, isOwner) => html`
  <section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
      <img src="${car.imageUrl}" />
      <hr />
      <ul class="listing-props">
        <li><span>Brand:</span>${car.brand}</li>
        <li><span>Model:</span>${car.model}</li>
        <li><span>Year:</span>${car.year}</li>
        <li><span>Price:</span>${car.price}$</li>
      </ul>

      <p class="description-para">${car.description}</p>

      ${isOwner
        ? html` <div class="listings-buttons">
            <a href="/edit/${car._id}" class="button-list">Edit</a>
            <a @click=${onDelete} href="#" class="button-list">Delete</a>
          </div>`
        : nothing}
    </div>
  </section>
`;

let ctx = null;

export async function showDetails(contex) {
  ctx = contex;
  const id = ctx.params.id;
  const user = await getUserData();
  const car = await getById(id);
  const isOwner = user ? user._id == car._ownerId : false;
  ctx.render(detailsTemplate(car, isOwner));
}

async function onDelete() {
  const agree = confirm("Are you sure you want to delete this event?");
  if (agree) {
    debugger;
    await deleteItem(ctx.params.id);
    ctx.page.redirect("/catalog");
  }
}
