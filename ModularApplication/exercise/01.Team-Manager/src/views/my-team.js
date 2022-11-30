import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getAllMemberInTeam, getAllMyTeams } from "../data/auth.js";
import { getUserData } from "../util.js";

const teamTemplate = team => html` <article class="layout">
  <img src="${team.team.logoUrl}" class="team-logo left-col" />
  <div class="tm-preview">
    <h2>${team.team.name}</h2>
    <p>${team.team.description}</p>
    <span class="details"> Members</span>
    <div>
      <a href="/details/${team.team._id}" class="action">See details</a>
    </div>
  </div>
</article>`;

const myTeamsTemplate = teams => html`
  <section id="my-teams">
    <article class="pad-med">
      <h1>My Teams</h1>
    </article>

    <article class="layout narrow">
      <div class="pad-med">
        ${teams.length == 0
          ? html`<p>You are not a member of any team yet.</p>
              <p>
                <a href="/teams">Browse all teams</a> to join one, or use the
                button bellow to cerate your own team.
              </p>`
          : nothing}
      </div>
      <div class=""><a href="/create" class="action cta">Create Team</a></div>
    </article>

    ${teams.map(team => teamTemplate(team))}
  </section>
`;

export async function showMyTeams(ctx) {
  const user = getUserData();
  const allMyTeams = await getAllMyTeams(user._id);
  ctx.render(myTeamsTemplate(Object.values(allMyTeams)));
}

async function showMembersOfTeam(team) {
  const allMember = await getAllMemberInTeam(team._id);
  return allMember;
}
