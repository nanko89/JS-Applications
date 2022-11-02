let formElement = document.querySelector("form");
const url = "http://localhost:3030/users/login";

formElement.addEventListener("submit", e => {
  e.preventDefault();
  let formData = new FormData(e.target);
  submitLogin(formData);
});

async function submitLogin(formData) {
  let email = formData.get("email");
  let password = formData.get("password");

  let body = { email, password };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (response.status == 200) {
      sessionStorage.setItem("authToken", data.accessToken);
      alert("Successful Login");
      window.location.href = "index.html";
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(error.message);
  }
}
