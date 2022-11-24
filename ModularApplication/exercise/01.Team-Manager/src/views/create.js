import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import {
  addMemeberToTeam,
  approveMemberShip,
  createTeam,
} from "../data/auth.js";
import { createSubmitHandler } from "../util.js";

const createTemplate = (onCreate, error) => html` <section id="create">
  <article class="narrow">
    <header class="pad-med">
      <h1>New Team</h1>
    </header>
    <form @submit=${onCreate} id="create-form" class="main-form pad-large">
      ${error ? html`<div class="error">${error}</div>` : nothing}
      <label>Team name: <input type="text" name="name" /></label>
      <label>Logo URL: <input type="text" name="logoUrl" /></label>
      <label>Description: <textarea name="description"></textarea></label>
      <input class="action cta" type="submit" value="Create Team" />
    </form>
  </article>
</section>`;

export function showCreate(ctx) {
  renderError();

  function renderError(message) {
    ctx.render(createTemplate(createSubmitHandler(onCreate), message));
  }

  async function onCreate({ name, logoUrl, description }) {
    if (!name || !logoUrl || !description) {
      renderError("All fields are require");
      return;
    }

    if (name.length < 4) {
      renderError("Team name must be at least 4 symbols!");
      return;
    }

    if (description.length < 10) {
      renderError("Description must be at least 10 symbols!");
      return;
    }

    const data = await createTeam(name, logoUrl, description);

    if (typeof data !== "object") {
      renderError(data);
      return;
    }
    const member = await addMemeberToTeam(data._ownerId, data._id);
    const approve = await approveMemberShip(
      member._id,
      data._ownerId,
      data._id
    );
    ctx.page.redirect("/my-teams");
  }
}
