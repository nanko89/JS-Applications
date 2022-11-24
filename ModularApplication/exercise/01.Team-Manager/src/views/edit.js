import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { editTeam, getTeamById } from "../data/auth.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (onEdit, team, error) => html` <section id="edit">
  <article class="narrow">
    <header class="pad-med">
      <h1>Edit Team</h1>
    </header>
    <form @submit=${onEdit} id="edit-form" class="main-form pad-large">
      ${error ? html`<div class="error">Error message.</div>` : nothing}
      <label
        >Team name: <input type="text" name="name" .value=${team.name}
      /></label>
      <label
        >Logo URL: <input type="text" name="logoUrl" .value=${team.logoUrl}
      /></label>
      <label
        >Description:
        <textarea name="description" .value=${team.description}></textarea>
      </label>
      <input class="action cta" type="submit" value="Save Changes" />
    </form>
  </article>
</section>`;

export function showEdit(ctx) {
  const id = ctx.params.id;
  const team = getTeamById(id);
  ctx.render(editTemplate(createSubmitHandler(onEdit), team, error));

  async function onEdit({ name, logoUrl, description }) {
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

    const data = await editTeam(name, logoUrl, description);

    if (typeof data !== "object") {
      renderError(data);
      return;
    }

    ctx.page.redirect("/my-teams");
  }
}
