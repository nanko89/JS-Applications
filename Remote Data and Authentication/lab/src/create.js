const formElement = document.querySelector("form");

formElement.addEventListener("submit", e => {
  e.preventDefault();
  const dataForm = new FormData(e.target);
  createRecipeCard(dataForm);
});

async function createRecipeCard(dataForm) {
  const url = "http://localhost:3030/data/recipes";

  const name = dataForm.get("name");
  const img = dataForm.get("img");
  const ingredients = dataForm
    .get("ingredients")
    .split("\n")
    .map(l => l.trim())
    .filter(l => l != "");
  const steps = dataForm
    .get("steps")
    .split("\n")
    .map(l => l.trim())
    .filter(l => l != "");

  const body = { name, img, ingredients, steps };
  console.log(body);

  const token = sessionStorage.getItem("authToken");
  if (!token) {
    return (window.location.href = "index.html");
  }

  try {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      window.location.href = "index.html";
    } else {
      throw new Error(await response.json());
    }
  } catch (err) {
    console.error(err.message);
  }
}
