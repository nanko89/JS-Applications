import * as api from "../api.js";
import { viewPage } from "../nav.js";
import { renderMovieDetails } from "../dom.js";
import { showHome } from "./home.js";

let movieId;
let movie;

const sectionEditMovie = document.querySelector("#edit-movie");
const sectionAddMovie = document.querySelector("#add-movie");
const sectionMovieDetails = document.querySelector("#movie-example");
const enrolledSpan = document.querySelector(".enrolled-span");

const formEdit = sectionEditMovie.querySelector("form");
const formAdd = sectionAddMovie.querySelector("form");
const section = document.querySelector("#home-page");
const catalog = section.querySelector(
  "#movie .card-deck.d-flex.justify-content-center"
);

catalog.addEventListener("click", e => {
  e.preventDefault();
  let id;
  if (e.target.tagName == "BUTTON") {
    id = e.target.id;
  } else {
    id = e.target.parentElement.querySelector(".btn").id;
  }
  detailsPage(id);
});

export function create(e) {
  e.preventDefault();
  viewPage(sectionAddMovie);
  formAdd.addEventListener("submit", onAddMovie);
}

function deleteMovie(e) {
  e.preventDefault();
  api.deleteMovie(movieId);
  showHome();
}

function editMovie(e) {
  e.preventDefault();
  viewPage(sectionEditMovie);
  const titleInput = formEdit.querySelector("#title");
  const descriptionInput = formEdit.querySelector("textarea");
  const imgInput = formEdit.querySelector("#imageUrl");

  titleInput.value = movie.title;
  descriptionInput.value = movie.description;
  imgInput.value = movie.img;

  formEdit.addEventListener("submit", onEditMovie);
}

async function getOwnLike() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return false;
  } else {
    const userId = user._id;
    const likes = await api.getSpecialLikes(movieId, userId);
    return likes.length > 0;
  }
}

async function likeMovie(e) {
  e.preventDefault();
  await api.addLikes({ movieId });
  await detailsPage(movieId);
}

async function detailsPage(id) {
  const data = await api.getMovieDetails(id);
  const likes = await api.getLikes(id);

  movieId = id;
  movie = data;

  renderMovieDetails(data, likes);
  viewPage(sectionMovieDetails);

  const buttons = sectionMovieDetails.querySelectorAll(".btn");
  const deleteBtn = buttons[0];
  const editBtn = buttons[1];
  const likeBtn = buttons[2];

  deleteBtn.addEventListener("click", deleteMovie);
  editBtn.addEventListener("click", editMovie);
  likeBtn.addEventListener("click", likeMovie);
  debugger;

  if (localStorage.getItem("user")) {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    if (data._ownerId === userId) {
      deleteBtn.style.display = "";
      editBtn.style.display = "";
      likeBtn.style.display = "none";
      enrolledSpan.style.display = "";
    } else {
      deleteBtn.style.display = "none";
      editBtn.style.display = "none";
      if (await getOwnLike()) {
        likeBtn.style.display = "none";
        enrolledSpan.style.display = "";
      } else {
        likeBtn.style.display = "";
        enrolledSpan.style.display = "none";
      }
    }
  } else {
    buttons.forEach(btn => (btn.style.display = "none"));
    if (getOwnLike()) {
      likeBtn.style.display = "none";
      enrolledSpan.style.display = "";
    } else {
      likeBtn.style.display = "";
      enrolledSpan.style.display = "none";
    }
  }
}
async function onAddMovie(e) {
  e.preventDefault();
  debugger;
  const formData = new FormData(formAdd);
  const title = formData.get("title");
  const description = formData.get("description");
  const img = formData.get("img");
  if (!title || !description || !img) {
    return alert("All fields are require");
  }
  await api.createMovie({ title, description, img });
  formAdd.reset();
  showHome();
}

async function onEditMovie(e) {
  e.preventDefault();
  const formData = new FormData(formEdit);
  const title = formData.get("title");
  const description = formData.get("description");
  const img = formData.get("img");
  if (!title || !description || !img) {
    return alert("All fields are require");
  }
  await api.editMovie(movieId, { title, description, img });
  formEdit.reset();
  showHome();
}
