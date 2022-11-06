function attachEvents() {
  const url = "http://localhost:3030/jsonstore/phonebook";

  const ulPhonebook = document.querySelector("#phonebook");

  const loadBtn = document.querySelector("#btnLoad");
  const createBtn = document.querySelector("#btnCreate");

  loadBtn.addEventListener("click", onLoad);
  createBtn.addEventListener("click", onCreate);

  async function onLoad() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();

      ulPhonebook.innerHTML = "";
      Object.values(data).forEach(el => {
        const li = document.createElement("li");
        li.id = `${el._id}`;
        li.textContent = `${el.person}: ${el.phone}`;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", onDelete);
        li.appendChild(deleteBtn);
        ulPhonebook.appendChild(li);
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  async function onCreate() {
    const person = document.querySelector("#person");
    const phone = document.querySelector("#phone");
    const body = { person: person.value, phone: phone.value };

    await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    person.value = "";
    phone.value = "";
  }
  async function onDelete(e) {
    const id = e.target.parentElement.id;

    await fetch(url + `/${id}`, {
      method: "delete",
    });
    document.getElementById(id).remove();
  }
}

attachEvents();
