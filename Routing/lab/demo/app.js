//detect URL changes and notify application
//change URL on application content swap

const views = {
  "/": () => "<h2>Home Page</h2>",
  "/catalog": () => "<h2>Catalog Page</h2>",
  "/about": () => "<h2>About Page</h2>",
};

document.querySelector("nav").addEventListener("click", onNavigate);
window.addEventListener("popstate", onPopState);

const main = document.querySelector("main");

//start application in previous view
onPopState();

function onNavigate(e) {
  if (e.target.tagName === "A") {
    const url = new URL(e.target.href);
    if (showView(url.pathname)) {
      e.preventDefault();
      history.pushState(null, "", url.pathname);
    }
  }
}

function onPopState() {
  const startingView = window.location.pathname;
  showView(startingView);
}

function showView(name) {
  const view = views[name];
  if (typeof view == "function") {
    main.innerHTML = view();
    return true;
  }
  return false;
}
