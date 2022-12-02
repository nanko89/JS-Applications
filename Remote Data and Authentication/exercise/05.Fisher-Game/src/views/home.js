import { create, edit, getAll, deleteItem, getById } from "../api/data.js";
import { html, render, nothing } from "../lib.js";
import { createSubmitHandler, getUserData } from "../util.js";

const catchTemplate = c => html` <div disabled class="catch">
  <label>Angler</label>
  <input type="text" class="angler" .value=${c.angler} />
  <label>Weight</label>
  <input type="text" class="weight" .value=${c.weight} />
  <label>Species</label>
  <input type="text" class="species" .value=${c.species} />
  <label>Location</label>
  <input type="text" class="location" .value=${c.location} />
  <label>Bait</label>
  <input type="text" class="bait" .value=${c.bait} />
  <label>Capture Time</label>
  <input type="number" class="captureTime" .value=${c.captureTime} />
  <button @click=${onUpdate} class="update" data-id=${c._id}>Update</button>
  <button @click=${onDelete} class="delete" data-id=${c._id}>Delete</button>
</div>`;

const catchesTemplate = catches => html` <legend>Catches</legend>
  <div id="catches">${catches.map(c => catchTemplate(c))}</div>`;

const homeTemplate = (onLoad, isUser, addCatches) => html` <section
  id="home-view"
>
  <fieldset id="main"></fieldset>
  <aside>
    <button @click=${onLoad} class="load">Load</button>
    <form @submit=${addCatches} id="addForm">
      <fieldset>
        <legend>Add Catch</legend>
        <label>Angler</label>
        <input type="text" name="angler" class="angler" />
        <label>Weight</label>
        <input type="number" name="weight" class="weight" />
        <label>Species</label>
        <input type="text" name="species" class="species" />
        <label>Location</label>
        <input type="text" name="location" class="location" />
        <label>Bait</label>
        <input type="text" name="bait" class="bait" />
        <label>Capture Time</label>
        <input type="number" name="captureTime" class="captureTime" />
        ${isUser
          ? html` <button class="add">Add</button>`
          : html`<button disabled class="add">Add</button>`}
      </fieldset>
    </form>
  </aside>
</section>`;

export async function showHome(ctx) {
  const user = await getUserData();
  const isUser = user ? true : false;
  debugger;
  ctx.render(homeTemplate(onLoad, isUser, createSubmitHandler(addCatches)));

  async function onLoad() {
    const main = document.querySelector("#main");
    const catches = await getAll();

    render(catchesTemplate(catches), main);

    const disabledElemnt = [];
    if (user) {
      const userId = user._id;

      catches.forEach(c => {
        if (c._ownerId !== userId) {
          disabledElemnt.push(c._id);
        }
      });
    } else {
      catches.forEach(c => {
        disabledElemnt.push(c._id);
      });
    }

    const updateButtons = document.querySelectorAll("button.update");
    const deleteButtons = document.querySelectorAll("button.delete");

    debugger;
    updateButtons.forEach(b => {
      if (disabledElemnt.includes(b.dataset.id)) {
        b.setAttribute("disabled", true);
        const inputs = b.parentElement.querySelectorAll("input");

        inputs.forEach(i => i.setAttribute("disabled", true));
      } else {
        b.removeAttribute("disabled");
      }
    });

    deleteButtons.forEach(b => {
      if (disabledElemnt.includes(b.dataset.id)) {
        b.setAttribute("disabled", true);
      } else {
        b.removeAttribute("disabled");
      }
    });
  }

  async function addCatches({
    angler,
    weight,
    species,
    location,
    bait,
    captureTime,
  }) {
    await create({
      angler,
      weight,
      species,
      location,
      bait,
      captureTime,
    });
  }
}

async function onDelete(e) {
  e.preventDefault();
  const id = e.target.dataset.id;
  await deleteItem(id);
  location.reload();
}

async function onUpdate(e) {
  e.preventDefault();
  const id = e.target.dataset.id;
  const form = e.target.parentElement;
  const angler = form.querySelector(".angler").value;
  const weight = form.querySelector(".weight").value;
  const species = form.querySelector(".species").value;
  const loc = form.querySelector(".location").value;
  const bait = form.querySelector(".bait").value;
  const captureTime = form.querySelector(".captureTime").value;
  const body = { angler, weight, species, location: loc, bait, captureTime };
  await edit(id, body);
  location.reload();
}
