import { viewPage } from "../nav.js";
import { getAllMovies } from "../api.js";
import { create } from "./movie.js";
import { renderAllMovie } from "../dom.js";

const sectionHome = document.querySelector("#home-page");
const addMovie = document.querySelector("#add-movie-button");

export function showHome() {
  viewPage(sectionHome);

  addMovie.addEventListener("click", create);
  if (localStorage.getItem("user")) {
    addMovie.style.display = "";
  } else {
    addMovie.style.display = "none";
  }

  showMovieList();
}

async function showMovieList() {
  const movies = await getAllMovies();
  renderAllMovie(movies);
}
