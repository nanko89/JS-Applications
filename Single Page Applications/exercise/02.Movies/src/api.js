import * as request from "./request.js";

const baseUrl = "http://localhost:3030";
const loginUrl = `${baseUrl}/users/login`;
const registerUrl = `${baseUrl}/users/register`;
const allMovieUrl = `${baseUrl}/data/movies`;
const likesUrl = `${baseUrl}/data/likes`;

export const login = async data => request.post(loginUrl, data);

export const register = async data => request.post(registerUrl, data);

export const getAllMovies = async () => request.get(allMovieUrl);

export const getMovieDetails = async movieId =>
  request.get(`${allMovieUrl}/${movieId}`);

export const createMovie = async data => request.post(allMovieUrl, data);

export const editMovie = async (movieId, data) =>
  request.put(`${allMovieUrl}/${movieId}`, data);

export const deleteMovie = movieId => request.del(`${allMovieUrl}/${movieId}`);

export const getLikes = async movieId =>
  request.get(
    `${likesUrl}?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`
  );

export const getSpecialLikes = async (movieId, userId) =>
  request.get(
    `${likesUrl}?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`
  );

export const addLikes = async data => request.post(likesUrl, data);

// export const deleteLikes = movieId => request.del(`${likesUrl}/${movieId}`);
