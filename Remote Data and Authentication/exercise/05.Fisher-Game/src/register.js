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

  if (password !== repass) {
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
    if (!response.ok) {
      throw new Error("Error");
    }
    const data = response.json();
    if (data.code !== 200) {
      throw new Error("Error");
    }

    sessionStorage.setItem("id", data._id);
    sessionStorage.setItem("email", data.email);
    sessionStorage.setItem("accessToken", data.accessToken);
    window.location = "./index.html";
  } catch (err) {
    errorP.textContent = "Error ";
    setTimeout(() => {
      errorP.textContent = "";
    }, 2000);
    return;
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
