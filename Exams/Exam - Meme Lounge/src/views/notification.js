export function notification(error) {
  document.querySelector("#errorBox span").textContent = error;
  document.querySelector("#errorBox").style.display = "block";

  setTimeout(
    () => (document.querySelector("#errorBox").style.display = "none"),
    3000
  );
}
