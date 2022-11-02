const formElement = document.querySelector("form");

formElement.addEventListener("submit", e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  submitRegister(formData);
});

async function submitRegister(data) {
  let email = data.get("email");
  let password = data.get("password");
  let rePass = data.get("rePass");

  if (password !== rePass) {
    return alert("Password doesn't match");
  }

  let body = { email, password };

  console.log(body);
  try {
    const url = "http://localhost:3030/users/register";
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    debugger;
    const data = response.json();

    if (response.status == 409) {
      return alert("Email already exist");
    }
    if (response.ok) {
      sessionStorage.setItem("authToken", data.accessToken);
      console.log(data.accessToken);
      alert("Successful Register");
      window.location.href = "index.html";
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    console.error(err.message);
  }
}
