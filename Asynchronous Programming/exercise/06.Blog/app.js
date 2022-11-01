function attachEvents() {
  const postUrl = "http://localhost:3030/jsonstore/blog/posts";
  const commentUrl = "http://localhost:3030/jsonstore/blog/comments";

  const posts = document.querySelector("#posts");
  const postTitle = document.querySelector("#post-title");
  const postBody = document.querySelector("#post-body");
  const postComments = document.querySelector("#post-comments");

  document.querySelector("#btnLoadPosts").addEventListener("click", getPosts);

  document
    .querySelector("#btnViewPost")
    .addEventListener("click", viewPostDetails);

  async function getPosts() {
    try {
      const responce = await fetch(postUrl);
      if (!responce.ok) {
        throw new Error();
      }
      const data = await responce.json();

      posts.replaceChildren();

      Object.values(data).forEach(post => {
        const option = document.createElement("option");
        option.value = post.id;
        option.textContent = post.title;
        posts.appendChild(option);
      });
    } catch (err) {
      console.log(err.status);
    }
  }

  async function viewPostDetails() {
    try {
      const postResponce = await fetch(postUrl);
      if (!postResponce.ok) {
        throw new Error();
      }
      const postData = await postResponce.json();

      const selectedPost = Object.values(postData).find(
        post => post.id === posts.value
      );
      debugger;

      postTitle.textContent = selectedPost.title;
      postBody.textContent = selectedPost.body;

      const commenteResponce = await fetch(commentUrl);
      if (!commenteResponce.ok) {
        throw new Error();
      }
      const commentData = await commenteResponce.json();

      postComments.replaceChildren();
      Object.values(commentData)
        .filter(comment => comment.postId == posts.value)
        .forEach(c => {
          const li = document.createElement("li");
          li.id = c.id;
          li.textContent = c.text;
          postComments.appendChild(li);
        });
    } catch (err) {
      console.log(err.status);
    }
  }
}
attachEvents();
