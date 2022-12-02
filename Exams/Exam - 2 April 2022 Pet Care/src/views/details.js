import { html, nothing } from "../lib.js";
import { deleteItem, getById } from "../api/data.js";
import { getUserData } from "../util.js";
import { canDonated, donate, totalDonate } from "../api/donations.js";

const detailsTemplate = (
  onDelete,
  onDonate,
  isOwner,
  isUser,
  pet,
  donations,
  canDonate
) => html` <section id="detailsPage">
  <div class="details">
    <div class="animalPic">
      <img src="${pet.image}" />
    </div>
    <div>
      <div class="animalInfo">
        <h1>Name: ${pet.name}</h1>
        <h3>Breed: ${pet.breed}</h3>
        <h4>Age: ${pet.age}</h4>
        <h4>Weight: ${pet.weight}</h4>
        <h4 class="donation">Donation: ${donations}$</h4>
      </div>
      ${isOwner
        ? html`
            <div class="actionBtn">
              <a href="/edit/${pet._id}" class="edit">Edit</a>
              <a @click=${onDelete} href="#" class="remove">Delete</a>
            </div>
          `
        : nothing}
      ${isUser && !isOwner && canDonate == 0
        ? html`
            <div class="actionBtn">
              <a @click=${onDonate} href="#" class="donate">Donate</a>
            </div>
          `
        : nothing}
    </div>
  </div>
</section>`;

export async function showDetails(ctx) {
  const id = ctx.params.id;

  const pet = await getById(id);
  const user = await getUserData();
  const donations = await totalDonate(id);

  const isUser = user ? true : false;
  const isOwner = user ? user._id == pet._ownerId : false;
  let canDonate = 0;
  if (user) {
    canDonate = await canDonated(id, user._id);
  }

  ctx.render(
    detailsTemplate(
      onDelete,
      onDonate,
      isOwner,
      isUser,
      pet,
      donations * 100,
      canDonate
    )
  );

  async function onDelete() {
    const agree = confirm("Are you sure you want to delete this event?");
    if (agree) {
      await deleteItem(ctx.params.id);
      ctx.page.redirect("/");
    }
  }

  async function onDonate() {
    await donate({ petId: id });
    ctx.page.redirect("/catalog/" + id);
  }
}
