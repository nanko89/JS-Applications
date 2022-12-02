import { html } from "../lib.js";
import { edit, getById } from "../api/data.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (song, onEdit) => html`<section class="editPage">
  <form @submit=${onEdit}>
    <fieldset>
      <legend>Edit Album</legend>

      <div class="container">
        <label for="name" class="vhide">Album name</label>
        <input
          id="name"
          name="name"
          class="name"
          type="text"
          .value=${song.name}
        />

        <label for="imgUrl" class="vhide">Image Url</label>
        <input
          id="imgUrl"
          name="imgUrl"
          class="imgUrl"
          type="text"
          .value=${song.imgUrl}
        />

        <label for="price" class="vhide">Price</label>
        <input
          id="price"
          name="price"
          class="price"
          type="text"
          .value=${song.price}
        />

        <label for="releaseDate" class="vhide">Release date</label>
        <input
          id="releaseDate"
          name="releaseDate"
          class="releaseDate"
          type="text"
          .value=${song.releaseDate}
        />

        <label for="artist" class="vhide">Artist</label>
        <input
          id="artist"
          name="artist"
          class="artist"
          type="text"
          .value=${song.artist}
        />

        <label for="genre" class="vhide">Genre</label>
        <input
          id="genre"
          name="genre"
          class="genre"
          type="text"
          .value=${song.genre}
        />

        <label for="description" class="vhide">Description</label>
        <textarea
          name="description"
          class="description"
          rows="10"
          cols="10"
          .value=${song.description}
        ></textarea>

        <button class="edit-album" type="submit">Edit Album</button>
      </div>
    </fieldset>
  </form>
</section>`;

export async function showEdit(ctx) {
  const id = ctx.params.id;
  const song = await getById(id);
  ctx.render(editTemplate(song, createSubmitHandler(onEdit)));
  async function onEdit({
    name,
    imgUrl,
    price,
    releaseDate,
    artist,
    genre,
    description,
  }) {
    if (
      !name ||
      !description ||
      !imgUrl ||
      !price ||
      !releaseDate ||
      !artist ||
      !genre
    ) {
      return alert("All fields are require");
    }

    await edit(id, {
      name,
      imgUrl,
      price,
      releaseDate,
      artist,
      genre,
      description,
    });
    ctx.page.redirect("/catalog/" + id);
  }
}
