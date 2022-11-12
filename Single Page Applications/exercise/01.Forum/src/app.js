import { showHome } from "./navigation.js";

const homeBtn = document.querySelector("nav a");
homeBtn.addEventListener("click", showHome);

showHome();
