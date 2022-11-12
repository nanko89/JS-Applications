import * as api from "./api.js";
import { previewComments, previewPosts, detalisPost } from "./dom.js";

let postId;
const container = document.querySelector(".container");
const postContainer = document.querySelector("main");
const commentContainer = document.querySelector(".theme-content");

const formPost = postContainer.querySelector("form");
formPost.addEventListener("submit", addPost);

const formComment = commentContainer.querySelector("form");
formComment.addEventListener("submit", addComment);

export function showHome() {
  commentContainer.remove();
  container.replaceChildren(postContainer);

  api.getPosts().then(post => {
    previewPosts(Object.values(post));
  });
}

export function showPost(e) {
  postContainer.remove();
  container.replaceChildren(commentContainer);
  postId = e.currentTarget.id;
  api.getComments().then(comment => {
    previewComments(Object.values(comment), postId);
  });
  api.getCurrentPost(postId).then(post => {
    detalisPost(post);
  });
}

function addPost(e) {
  e.preventDefault();

  if (e.submitter.innerHTML == "Cancel") {
    formPost.reset();
  }

  const formData = new FormData(e.target);
  const title = formData.get("topicName");
  const username = formData.get("username");
  const content = formData.get("postText");

  if (!title || !username || !content) {
    alert("All fields are require");
    return;
  }
  const body = { title, username, content, date: new Date() };
  api.createPost(body);
  formPost.reset();
  showHome();
}

function addComment(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  debugger;
  const username = formData.get("username");
  const text = formData.get("postText");

  if (!text || !username) {
    alert("All fields are require");
    return;
  }
  const body = { text, username, postId, date: new Date() };
  api.createComment(body);
  formComment.reset();
  api.getComments().then(comment => {
    previewComments(Object.values(comment), postId);
  });
}
