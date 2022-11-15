const section = document.querySelector("#homePage");

export function showHome(contex) {
  contex.showSection(section);
  section.querySelector(".btn").addEventListener("click", async e => {
    e.preventDefault();
    contex.goTo("/catalog");
  });
}
