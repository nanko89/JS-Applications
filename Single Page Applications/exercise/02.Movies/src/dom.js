const sectionMovie = document.querySelector("#movie");
const sectionMovieDetails = document.querySelector("#movie-example");

const movieList = sectionMovie.querySelector(".card-deck");

export function renderAllMovie(data) {
  movieList.replaceChildren();

  data.forEach(movie => {
    const element = renderMovieView(movie);
    movieList.appendChild(element);
  });
}

export function renderMovieDetails(data, likes) {
  const { title, img, description, _ownerId } = data;

  sectionMovieDetails.replaceChildren();

  const container = document.createElement("div");
  container.classList.add("container");
  container.id = _ownerId;
  container.innerHTML = `
  <div class="row bg-light text-dark">
    <h1>Movie title: ${title}</h1>

    <div class="col-md-8">
      <img
        class="img-thumbnail"
        src="${img}"
        alt="Movie"
      />
    </div>
    <div class="col-md-4 text-center">
      <h3 class="my-3">Movie Description</h3>
      <p>
        ${description}
      </p>
      <a class="btn btn-danger" href="#">Delete</a>
      <a class="btn btn-warning" href="#">Edit</a>
      <a class="btn btn-primary" href="#">Like</a>
      <span class="enrolled-span">Liked (${likes > 0 ? likes : 0})</span>
    </div>
  </div>`;

  sectionMovieDetails.appendChild(container);
}

function renderMovieView(body) {
  const { img, title, _id } = body;
  const element = document.createElement("div");
  element.classList.add("card", "mb-4");
  element.innerHTML = `
    <img class="card-img-top" src="${img}"
         alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${title}</h4>
    </div>
    <div class="card-footer">
        <a href="#">
            <button type="button" class="btn btn-info" id=${_id}>Details</button>
        </a>
    </div>`;
  return element;
}
