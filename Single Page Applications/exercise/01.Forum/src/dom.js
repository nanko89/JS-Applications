import { showPost } from "./navigation.js";

const postContainer = document.querySelector("main");
const topicContainer = postContainer.querySelector(".topic-container");
const header = document.querySelector(".header");
const themeName = document.querySelector(".theme-name h2");
const userComment = document.querySelector("#user-comment");

export function previewPosts(post) {
  topicContainer.innerHTML = "";

  post.forEach(x => {
    const post = renderPost(x);
    post.addEventListener("click", showPost);
    topicContainer.appendChild(post);
  });
}

export function previewComments(comments, id) {
  userComment.innerHTML = "";
  comments.forEach(c => {
    if (c.postId === id) {
      const comment = renderComment(c);
      userComment.appendChild(comment);
    }
  });
}

export function detalisPost(post) {
  renderTitle(post);
  renderHead(post);
}

function renderPost(data) {
  const { title, date, username } = data;
  const div = document.createElement("div");
  div.classList.add("topic-name-wrapper");
  div.id = data._id;
  div.innerHTML = `
              <div class="topic-name">
                  <a href="#" class="normal">
                      <h2>${title}</h2>
                  </a>
                  <div class="columns">
                      <div>
                          <p>Date: <time>${date}</time></p>
                          <div class="nick-name">
                              <p>Username: <span>${username}</span></p>
                          </div>
                      </div>
                  </div>
              </div>`;
  return div;
}

function renderComment(data) {
  const { text, date, username } = data;

  const div = document.createElement("div");
  div.classList.add("topic-name-wrapper");
  div.innerHTML = `
            <div class="topic-name">
                <p><strong>${username}</strong> commented on <time>${date}</time></p>
                <div class="post-content">
                    <p>${text}</p>
                </div>
            </div>`;
  return div;
}

function renderHead(data) {
  const { username, date, content } = data;
  header.innerHTML = `
  <div class="header">
        <img src="./static/profile.png" alt="avatar">
        <p><span>${username}</span> posted on <time>${date}</time></p>

        <p class="post-content">${content}</p>
    </div>`;
}

function renderTitle(data) {
  themeName.textContent = data.title;
}
