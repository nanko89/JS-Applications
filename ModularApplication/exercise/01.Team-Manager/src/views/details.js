import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import {
  addMemeberToTeam,
  deleteMemeber,
  getAllMemberInTeam,
  getTeamById,
} from "../data/auth.js";
import { getUserData } from "../util.js";

const detailsTemplate = (
  team,
  members,
  pendings,
  isOwner,
  isPending,
  isMembers,
  userId
) => html`
  <section id="team-home">
    <article class="layout">
      <img src="${team.logoUrl}" class="team-logo left-col" />
      <div class="tm-preview">
        <h2>${team.name}</h2>
        <p>${team.description}</p>
        <span class="details">${members.length} Members</span>
        <div>
          ${isOwner
            ? html`<a href="/edit/${team._id}" class="action">Edit team</a>`
            : nothing}
          ${!isMembers && !isPending && userId
            ? html`<a href="/add-member/${userId}/${team._id}" class="action"
                >Join team</a
              >`
            : nothing}
          ${isMembers
            ? html`<a href="/delete/${userId}" class="action invert"
                >Leave team</a
              >`
            : nothing}
          ${isPending
            ? html` Membership pending.
                <a href="/delete/${userId}">Cancel request</a>`
            : nothing}
        </div>
      </div>
      <div class="pad-large">
        <h3>Members</h3>
        <ul class="tm-members">
          <li>My Username</li>
          ${members.map(
            member =>
              html` <li>
                ${member.user.username}
                ${isOwner
                  ? html`<a
                      href="/delete/${member._id}"
                      class="tm-control action"
                      >Remove from team</a
                    >`
                  : nothing}
              </li>`
          )}
        </ul>
      </div>
      <div class="pad-large">
        ${isOwner
          ? html` <h3>Membership Requests</h3>
              <ul class="tm-members">
                ${pendings.map(
                  pending =>
                    html` <li>
                      ${pending.user.username}
                      <a
                        href="/approve/${pending._id}"
                        class="tm-control action"
                        >Approve</a
                      ><a
                        href="/delete/${pending._id}"
                        class="tm-control action"
                        >Decline</a
                      >
                    </li>`
                )}
              </ul>`
          : nothing}
      </div>
    </article>
  </section>
`;

export async function showDetails(ctx) {
  debugger;
  const id = ctx.params.id;
  const user = getUserData();
  const team = await getTeamById(id);

  let isOwner = false;
  let isPending = false;
  let isMembers = false;

  const allMember = await getAllMemberInTeam(team._id);
  const members = allMember.filter(m => m.status == "member");
  const pendings = allMember.filter(m => m.status == "pending");
  let userId = null;

  if (user) {
    isOwner = user._id == team._ownerId;
    isPending = pendings.find(p => p._id == user._id || p._ownerId == user._id);
    isMembers = members.find(m => m._id == user._id || m._ownerId == user._id);
    userId = user._id;
  }
  ctx.render(
    detailsTemplate(
      team,
      members,
      pendings,
      isOwner,
      isPending,
      isMembers,
      userId
    )
  );
}

export async function removeMember(ctx) {
  const id = ctx.params.id;
  await deleteMemeber(id);
  ctx.page.redirect("/my-teams");
}

export async function addMember(ctx) {
  const id = ctx.params.id;
  const teamId = ctx.params.teamId;
  await addMemeberToTeam(id, teamId);
  ctx.page.redirect("/my-teams");
}
