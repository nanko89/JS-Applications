document
  .getElementById("register-form")
  .addEventListener("submit", registerHandler);
const guestElements = document.querySelector("#guest");
const userElements = document.querySelector("#user");

const email = sessionStorage.getItem("email");

document.querySelectorAll("a").forEach(a => a.classList.remove("active"));
document.getElementById("register").classList.add("active");

if (email) {
  window.location.href = "index.html";
  userElements.style.display = "inline-block";
  guestElements.style.display = "none";
} else {
  userElements.style.display = "none";
  guestElements.style.display = "inline-block";
}

const errorP = document.querySelector("p.notification");

function registerHandler(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const email = formData.get("email");
  const password = formData.get("password");
  const repass = formData.get("rePass");

  // const {email,password,rePass} = Object.fromEntries(formData);

  if (password !== repass || !email || !password || !repass) {
    errorP.textContent = "Error";
    setTimeout(() => {
      errorP.textContent = "";
    }, 2000);
  } else {
    onRegister(email, password);
  }
}

async function onRegister(email, password) {
  const url = "http://localhost:3030/users/register";
  const body = { email, password };
  const header = getHeader("POST", body);

  try {
    const response = await fetch(url, header);

    const data = response.json();
    if (response.status == 409) {
      throw new Error("Email already exist");
    }
    if (response.ok) {
      sessionStorage.setItem("id", data._id);
      sessionStorage.setItem("email", data.email);
      sessionStorage.setItem("accessToken", data.accessToken);
      window.location = "./index.html";
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    errorP.textContent = err.message;
  }
}

function getHeader(method, body) {
  return {
    method: `${method}`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}
