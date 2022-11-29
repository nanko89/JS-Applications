import { getComment, postComment } from "../api/comment.js";
import { deleteItem, getById } from "../api/data.js";
import { html, nothing } from "../lib.js";
import { createSubmitHandler, getUserData } from "../util.js";

const commentTemplate = comment => html`<li class="comment">
  <p>${comment.comment}</p>
</li>`;

const detailsTemplate = (
  game,
  isOwner,
  isUser,
  onDelete,
  onComment,
  comments
) => html` <section id="game-details">
  <h1>Game Details</h1>
  <div class="info-section">
    <div class="game-header">
      <img class="game-img" src="${game.imageUrl}" />
      <h1>${game.title}</h1>
      <span class="levels">MaxLevel: ${game.maxLevel}</span>
      <p class="type">${game.category}y</p>
    </div>

    <p class="text">${game.summary}</p>

    <div class="details-comments">
      <h2>Comments:</h2>

      ${comments.length == 0
        ? html`<p class="no-comment">No comments.</p>`
        : html` <ul>
            ${comments.map(commentTemplate)}
          </ul>`}
    </div>

    ${isOwner
      ? html` <div class="buttons">
          <a href="/edit/${game._id}" class="button">Edit</a>
          <a @click=${onDelete} href="#" class="button">Delete</a>
        </div>`
      : nothing}
  </div>

  ${isUser && !isOwner
    ? html` <article class="create-comment">
        <label>Add new comment:</label>
        <form @submit=${onComment} class="form">
          <textarea name="comment" placeholder="Comment......"></textarea>
          <input class="btn submit" type="submit" value="Add Comment" />
        </form>
      </article>`
    : nothing}
</section>`;

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const user = await getUserData();
  const game = await getById(id);
  const isOwner = user ? user._id == game._ownerId : false;
  const isUser = user ? true : false;

  const comments = await getComment(id);
  ctx.render(
    detailsTemplate(game, isOwner, isUser, onDelete, onComment, comments)
  );

  async function onDelete() {
    const confirmed = confirm("Are you sure you want to delete this game?");
    if (confirmed) {
      await deleteItem(id);
      ctx.page.redirect("/catalog");
    }
  }

  async function onComment(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const comment = formData.get("comment");
    const gameId = id;

    await postComment({ gameId, comment });

    e.target.reset();
    ctx.page.redirect("/catalog/" + id);
  }
}
