import { html } from "../lib.js";
import { getMyPosts } from "../api/data.js";
import { getUserData } from "../util.js";

const cardTemplate = post => html` <div class="post">
  <h2 class="post-title">${post.title}</h2>
  <img class="post-image" src="${post.imageUrl}" alt="Material Image" />
  <div class="btn-wrapper">
    <a href="/details/${post._id}" class="details-btn btn">Details</a>
  </div>
</div>`;

const myPostsTemplate = posts => html` <section id="my-posts-page">
  <h1 class="title">My Posts</h1>

  ${posts.length == 0
    ? html`<h1 class="title no-posts-title">You have no posts yet!</h1>`
    : html`<div class="my-posts">${posts.map(cardTemplate)}</div>`}
</section>`;

export async function showMyPosts(ctx) {
  const user = await getUserData();
  const posts = await getMyPosts(user._id);
  ctx.render(myPostsTemplate(posts));
}
