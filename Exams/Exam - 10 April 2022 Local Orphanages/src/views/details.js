import { html, nothing } from "../lib.js";
import { deleteItem, getById } from "../api/data.js";
import { getUserData } from "../util.js";
import { getTotalDonation, hasDonatin, donate } from "../api/donate.js";

const detailsTemplate = (
  onDelete,
  onDonate,
  isOwner,
  isUser,
  post,
  donate,
  hasDonate
) => html` <section id="details-page">
  <h1 class="title">${post.title}</h1>

  <div id="container">
    <div id="details">
      <div class="image-wrapper">
        <img src=${post.imageUrl} alt="Material Image" class="post-image" />
      </div>
      <div class="info">
        <h2 class="title post-title">${post.title}</h2>
        <p class="post-description">Description: ${post.description}</p>
        <p class="post-address">Address: ${post.address}</p>
        <p class="post-number">Phone number: ${post.phone}</p>
        <p class="donate-Item">Donate Materials: ${donate}</p>

        <!--Edit and Delete are only for creator-->
        ${isOwner
          ? html` <div class="btns">
              <a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
              <a @click=${onDelete} href="#" class="delete-btn btn">Delete</a>
            </div>`
          : nothing}
        ${isUser && !isOwner && hasDonate == 0
          ? html` <div class="btns">
              <a @click=${onDonate} href="#" class="donate-btn btn">Donate</a>
            </div>`
          : nothing}
      </div>
    </div>
  </div>
</section>`;

export async function showDetails(ctx) {
  const id = ctx.params.id;

  const post = await getById(id);
  const user = await getUserData();
  const allDonate = await getTotalDonation(id);
  const hasDonate = await hasDonatin(id, user._id);

  const isUser = user ? true : false;
  const isOwner = user ? user._id == post._ownerId : false;

  ctx.render(
    detailsTemplate(
      onDelete,
      onDonate,
      isOwner,
      isUser,
      post,
      allDonate,
      hasDonate
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
    await donate({ postId: id });
    ctx.page.redirect("/details/" + id);
  }
}
