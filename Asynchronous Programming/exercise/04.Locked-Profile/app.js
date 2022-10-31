async function lockedProfile() {
  let url = "http://localhost:3030/jsonstore/advanced/profiles";
  let main = document.querySelector("main");
  main.replaceChildren();
  try {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error("Error");
    }

    let data = await res.json();

    let id = 1;
    for (let person of Object.values(data)) {
      let { username, email, age } = person;
      let divProfile = e("div", "", "profile", main);
      let img = e("img", "", "userIcon", divProfile);
      img.setAttribute("src", "./iconProfile2.png");
      e("label", "Lock", "", divProfile);

      let lockInput = e("input", "", "", divProfile);
      lockInput.setAttribute("type", "radio");
      lockInput.setAttribute("name", `user${id}Locked`);
      lockInput.setAttribute("value", "lock");
      lockInput.setAttribute("checked", true);

      e("label", "Unlock", "", divProfile);
      let unlockInput = e("input", "", "", divProfile);
      unlockInput.setAttribute("type", "radio");
      unlockInput.setAttribute("name", `user${id}Locked`);
      unlockInput.setAttribute("value", "unlock");

      e("br", "", "", divProfile);
      e("hr", "", "", divProfile);

      e("label", "Username", "", divProfile);
      let usernameInput = e("input", "", "", divProfile);
      usernameInput.setAttribute("type", "text");
      usernameInput.setAttribute("name", `user${id}Username`);
      usernameInput.setAttribute("value", `${username}`);
      usernameInput.setAttribute("disabled", true);
      usernameInput.setAttribute("readonly", true);

      let divUser = e("div", "", "", divProfile);
      divUser.setAttribute("id", "userHiddenFields");
      divUser.style.display = "none";
      e("hr", "", "", divUser);

      e("label", "Email:", "", divUser);
      let emailInput = e("input", "", "", divUser);
      emailInput.setAttribute("type", "email");
      emailInput.setAttribute("name", `user${id}Email`);
      emailInput.setAttribute("value", `${email}`);
      emailInput.setAttribute("disabled", true);
      emailInput.setAttribute("readonly", true);

      e("label", "Age:", "", divUser);
      let ageInput = e("input", "", "", divUser);
      ageInput.setAttribute("type", "email");
      ageInput.setAttribute("name", `user${id}Age`);
      ageInput.setAttribute("value", `${age}`);
      ageInput.setAttribute("disabled", true);
      ageInput.setAttribute("readonly", true);

      id++;
      let buttonShow = e("button", "Show more", "", divProfile);
      buttonShow.addEventListener("click", e => {
        if (unlockInput.checked && e.target.textContent === "Show more") {
          divUser.style.display = "block";
          buttonShow.textContent = "Hide it";
        } else if (unlockInput.checked && e.target.textContent === "Hide it") {
          divUser.style.display = "none";
          buttonShow.textContent = "Show more";
        }
      });
    }
  } catch (err) {
    console.error(err.message);
  }
}

function e(type, content, className, parent) {
  const element = document.createElement(type);
  element.textContent = content;
  element.className = className;

  if (parent) {
    parent.appendChild(element);
  }
  return element;
}
