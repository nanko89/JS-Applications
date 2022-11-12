import * as request from "./request.js";

const baseUrl = "http://localhost:3030/jsonstore/collections/myboard";
const postsUrl = `${baseUrl}/posts`;
const commentUrl = `${baseUrl}/comments`;

export const getPosts = () => request.get(postsUrl);

export const getCurrentPost = id => request.get(postsUrl + "/" + id);

export const createPost = data => {
  return request.post(postsUrl, data);
};

export const getComments = () => request.get(commentUrl);

export const createComment = data => {
  return request.post(commentUrl, data);
};
