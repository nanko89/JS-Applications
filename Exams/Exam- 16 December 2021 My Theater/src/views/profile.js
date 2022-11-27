import { getProfileInfo } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const cartTemplate = ev => html` <div class="eventBoard">
  <div class="event-info">
    <img src=${ev.imageUrl} />
    <h2>${ev.title}</h2>
    <h6>${ev.date}</h6>
    <a href="/details/${ev._id}" class="details-button">Details</a>
  </div>
</div>`;

const profileTemplate = (user, events) => html` <section id="profilePage">
  <div class="userInfo">
    <div class="avatar">
      <img src="/images/profilePic.png" />
    </div>
    <h2>${user.email}</h2>
  </div>
  ${events.length == 0
    ? html` <div class="board">
        <div class="no-events">
          <p>This user has no events yet!</p>
        </div>
      </div>`
    : html` <div class="board">${events.map(e => cartTemplate(e))}</div> `}
</section>`;

export async function showProfile(ctx) {
  const user = await getUserData();
  const events = await getProfileInfo(user._id);
  ctx.render(profileTemplate(user, events));
}
