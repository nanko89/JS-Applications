import { html, nothing } from "../lib.js";
import { getUserData } from "../util.js";
import { getById, deleteItem } from "../api/data.js";
import { applyOffer, canApply, getAllApply } from "../api/apply.js";

const detailsTemplate = (
  offer,
  totalApplay,
  isApply,
  onDelete,
  onApply,
  isOwner,
  isUser
) => html` <section id="details">
  <div id="details-wrapper">
    <img id="details-img" src=${offer.imageUrl} alt="example1" />
    <p id="details-title">${offer.title}</p>
    <p id="details-category">
      Category: <span id="categories">${offer.category}</span>
    </p>
    <p id="details-salary">
      Salary: <span id="salary-number">${offer.salary}</span>
    </p>
    <div id="info-wrapper">
      <div id="details-description">
        <h4>Description</h4>
        <span>${offer.description}</span>
      </div>
      <div id="details-requirements">
        <h4>Requirements</h4>
        <span>${offer.requirements}</span>
      </div>
    </div>
    <p>Applications: <strong id="applications">${totalApplay}</strong></p>

    ${isOwner
      ? html` <div id="action-buttons">
          <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
          <a @click=${onDelete} href="#" id="delete-btn">Delete</a>
        </div>`
      : nothing}
    ${isUser && !isOwner && isApply == 0
      ? html` <a @click=${onApply} href="#" id="apply-btn">Apply</a>`
      : nothing}
  </div>
</section>`;

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const offer = await getById(id);
  const user = await getUserData();
  const totalApplay = await getAllApply(id);

  const isApply = await canApply(id, user._id);
  const isUser = user ? true : false;
  const isOwner = user ? user._id == offer._ownerId : false;

  ctx.render(
    detailsTemplate(
      offer,
      totalApplay,
      isApply,
      onDelete,
      onApply,
      isOwner,
      isUser
    )
  );

  async function onDelete() {
    const agree = confirm("Are you sure you want to delete this event?");

    if (agree) {
      await deleteItem(ctx.params.id);
      ctx.page.redirect("/catalog");
    }
  }

  async function onApply() {
    await applyOffer({ offerId: id });
    ctx.page.redirect("/catalog/" + id);
  }
}
