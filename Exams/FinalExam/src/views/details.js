import { html, nothing } from "../lib.js";
import { deleteItem, getById } from "../api/data.js";
import { getUserData } from "../util.js";
import { like, myLikes, totalLike } from "../api/likes.js";

const detailsTemplate = (
  onDelete,
  isOwner,
  isUser,
  album,
  likes,
  myLike,
  onLike
) => html` <section id="details">
  <div id="details-wrapper">
    <p id="details-title">Album Details</p>
    <div id="img-wrapper">
      <img src=${album.imageUrl} alt="example1" />
    </div>
    <div id="info-wrapper">
      <p>
        <strong>Band:</strong><span id="details-singer">${album.singer}</span>
      </p>
      <p>
        <strong>Album name:</strong
        ><span id="details-album">${album.album}</span>
      </p>
      <p>
        <strong>Release date:</strong
        ><span id="details-release">${album.release}</span>
      </p>
      <p>
        <strong>Label:</strong><span id="details-label">${album.label}</span>
      </p>
      <p>
        <strong>Sales:</strong><span id="details-sales">${album.sales}</span>
      </p>
    </div>
    <div id="likes">Likes: <span id="likes-count">${likes}</span></div>

    <!--Edit and Delete are only for creator-->
    ${isOwner
      ? html` <div id="action-buttons">
          <a href="/edit/${album._id}" id="edit-btn">Edit</a>
          <a @click=${onDelete} href="#" id="delete-btn">Delete</a>
        </div>`
      : nothing}
    ${isUser && !isOwner && myLike == 0
      ? html` <div id="action-buttons">
          <a @click=${onLike} href="#" id="like-btn">Like</a>
        </div>`
      : nothing}
  </div>
</section>`;

export async function showDetails(ctx) {
  const id = ctx.params.id;

  const album = await getById(id);
  const user = await getUserData();
  const likes = await totalLike(id);
  const myLike = await myLikes(id, user._id);

  const isUser = user ? true : false;
  const isOwner = user ? user._id == album._ownerId : false;

  ctx.render(
    detailsTemplate(onDelete, isOwner, isUser, album, likes, myLike, onLike)
  );

  async function onDelete() {
    const agree = confirm("Are you sure you want to delete this event?");
    if (agree) {
      await deleteItem(ctx.params.id);
      ctx.page.redirect("/catalog");
    }
  }
  async function onLike() {
    await like({ albumId: id });
    ctx.page.redirect("/catalog/" + id);
  }
}
