async function attachEvents() {
  const submitBtn = document.getElementById("submit");
  const refreshBtn = document.getElementById("refresh");
  const message = document.getElementById("messages");

  submitBtn.addEventListener("click", sendInfo);
  refreshBtn.addEventListener("click", refresh);

  const url = "http://localhost:3030/jsonstore/messenger";

  async function refresh(e) {
    message.textContent = "";
    const response = await fetch(url);
    try {
      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      let allMessage = "";
      Object.values(data).forEach(
        m => (allMessage += `${m.author}: ${m.content}\n`)
      );

      message.textContent = allMessage.trim();
    } catch (err) {
      console.error(err);
    }
  }

  async function sendInfo(e) {
    const author = document.querySelector('input[name="author"]');
    const content = document.querySelector('input[name="content"]');

    const body = JSON.stringify({
      author: author.value,
      content: content.value,
    });

    try {
      const response = await fetch(url, {
        method: "post",
        headers: {
          "content-type": "applicasion/json",
        },
        body,
      });

      if (!response.ok) {
        throw new Error();
      }
      author.value = "";
      content.value = "";
    } catch (err) {
      console.error(err.message);
    }
  }
}

attachEvents();
