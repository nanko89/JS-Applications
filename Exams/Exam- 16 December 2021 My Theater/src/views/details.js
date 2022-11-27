import { deleteEvent, getById } from "../api/data.js";
import { html, nothing } from "../lib.js";
import { getUserData } from "../util.js";
import { addLikes, getIsLike, getTotalLikes } from "../api/likes.js";

const detailsTemplate = (ev, isOwner, isUser, hasLiked, totalLike) => html`
  <section id="detailsPage">
    <div id="detailsBox">
      <div class="detailsInfo">
        <h1>Title: ${ev.title}</h1>
        <div>
          <img src="${ev.imageUrl}" />
        </div>
      </div>

      <div class="details">
        <h3>Theater Description</h3>
        <p>${ev.description}</p>
        <h4>Date: ${ev.date}</h4>
        <h4>Author: ${ev.author}</h4>
        <div class="buttons">
          ${isOwner
            ? html` <a @click=${onDelete} class="btn-delete" href="#">Delete</a>
                <a class="btn-edit" href="/edit/${ev._id}">Edit</a>`
            : nothing}
          ${isUser && !isOwner && hasLiked == 0
            ? html` <a @click=${onLike} class="btn-like" href="#">Like</a>`
            : nothing}
        </div>
        <p class="likes">Likes: ${totalLike}</p>
      </div>
    </div>
  </section>
`;

let ctx = null;
export async function showDetails(context) {
  ctx = context;
  const id = ctx.params.id;
  const ev = await getById(id);
  debugger;
  const totalLike = await getTotalLikes(id);
  const user = await getUserData();
  let hasLiked = 0;
  const isUser = user ? true : false;
  const isOwner = user ? user._id == ev._ownerId : false;

  if (isUser && !isOwner) {
    hasLiked = await getIsLike(id, user._id);
  }

  ctx.render(detailsTemplate(ev, isOwner, isUser, hasLiked, totalLike));
}

async function onDelete() {
  const agree = confirm("Are you sure you want to delete this event?");
  if (agree) {
    await deleteEvent(ctx.params.id);
    ctx.page.redirect("/");
  }
}

async function onLike() {
  const theaterId = ctx.params.id;
  await addLikes({ theaterId });
  ctx.page.redirect("/details/" + theaterId);
}
