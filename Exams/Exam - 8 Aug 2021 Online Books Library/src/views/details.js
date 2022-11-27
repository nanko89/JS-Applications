import { deleteBook, getById } from "../api/data.js";
import { getAllLikes, hasLike, like } from "../api/likes.js";
import { html, nothing } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (book, hasUser, isOwner, totalLikes, isLike) => html`
  <section id="details-page" class="details">
    <div class="book-information">
      <h3>${book.title}</h3>
      <p class="type">Type: ${book.type}</p>
      <p class="img"><img src=${book.imageUrl} /></p>
      <div class="actions">
        ${isOwner
          ? html`<a class="button" href="/edit/${book._id}">Edit</a>
              <a @click=${onDelete} class="button" href="#">Delete</a>`
          : nothing}
        ${hasUser && !isOwner && isLike == 0
          ? html`<a @click=${onLike} class="button" href="#">Like</a>`
          : nothing}
        <div class="likes">
          <img class="hearts" src="/images/heart.png" />
          <span id="total-likes">Likes: ${totalLikes}</span>
        </div>
      </div>
    </div>
    <div class="book-description">
      <h3>Description:</h3>
      <p>${book.description}</p>
    </div>
  </section>
`;

let ctx = null;

export async function showDetails(context) {
  ctx = context;
  const id = ctx.params.id;
  const totalLikes = await getAllLikes(id);
  const book = await getById(id);
  const user = await getUserData();

  const isOwner = user ? book._ownerId == user._id : false;
  const hasUser = user ? true : false;
  let isLike = 0;

  if (hasUser) {
    isLike = await hasLike(book._id, user._id);
  }

  ctx.render(detailsTemplate(book, hasUser, isOwner, totalLikes, isLike));
}

async function onDelete() {
  const id = ctx.params.id;
  const confirmed = confirm("Are you sure you want to delete this book?");
  if (confirmed) {
    await deleteBook(id);
    ctx.page.redirect("/");
  }
}

async function onLike() {
  const bookId = ctx.params.id;
  await like({ bookId });
  ctx.page.redirect("/details/" + bookId);
}
