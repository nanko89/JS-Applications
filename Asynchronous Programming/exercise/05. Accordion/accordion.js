async function solution() {
  let url = "http://localhost:3030/jsonstore/advanced/articles/list";
  let main = document.querySelector("#main");
  try {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error();
    }

    let data = await res.json();

    for (let item of Object.values(data)) {
      let resInfo = await fetch(
        `http://localhost:3030/jsonstore/advanced/articles/details/${item._id}`
      );

      if (!resInfo.ok) {
        throw new Error();
      }

      let info = await resInfo.json();

      let divAccordion = e("div", "", main, "accordion");
      let divHead = e("div", "", divAccordion, "head");
      e("span", `${item.title}`, divHead);
      let button = e("button", "More", divHead, "button");
      button.id = `${item._id}`;
      let divExtra = e("div", "", divAccordion, "extra");
      e("p", `${info.content}`, divExtra);

      button.addEventListener("click", e => {
        if (button.textContent === "More") {
          button.textContent = "Less";
          divExtra.style.display = "block";
        } else {
          button.textContent = "More";
          divExtra.style.display = "none";
        }
      });
    }
  } catch (err) {}
}

function e(type, content, parent, className) {
  const element = document.createElement(type);
  element.textContent = content;

  if (className) {
    element.className = className;
  }
  if (parent) {
    parent.appendChild(element);
  }
  return element;
}

solution();
