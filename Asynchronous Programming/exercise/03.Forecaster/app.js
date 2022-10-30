let town = document.querySelector("#location");

let forecast = document.querySelector("#forecast");
let current = document.querySelector("#current");
let upcoming = document.querySelector("#upcoming");
let submitBtn = document.querySelector("#submit");

const url = "http://localhost:3030/jsonstore/forecaster/locations";

const symbol = {
  Sunny: "\u2600",
  "Partly sunny": "\u26c5",
  Overcast: "\u2601",
  Rain: "\u2602",
  Degrees: "\u00b0",
};

function attachEvents() {
  submitBtn.addEventListener("click", getWeather);
}

async function getWeather() {
  debugger;
  try {
    if (!town.value) {
      throw new Error();
    }

    if (current.children[1]) {
      current.children[1].remove();
      upcoming.children[1].remove();
    }

    forecast.style.display = "block";
    upcoming.style.display = "block";

    current.querySelector(".label").textContent = "Current conditions";

    let res = await fetch(url);
    if (!res.ok) {
      throw new Error("Error");
    }
    let data = await res.json();
    let currentTown = data.find(d => d.name === town.value);
    if (!currentTown) {
      throw new Error("Error, not found name of town!");
    }

    previewToday(currentTown.code);
    previewUpcoming(currentTown.code);
  } catch (error) {
    current.querySelector(".label").textContent = "Error";
    upcoming.style.display = "none";
  }

  async function previewToday(code) {
    const urlToday = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
    let res = await fetch(urlToday);
    if (!res.ok) {
      throw new Error("Error: " + res.status);
    }

    let data = await res.json();
    if (!data) {
      throw new Error();
    }

    let divForcast = e("div", "", "forecasts", current);
    e(
      "span",
      `${symbol[data.forecast.condition]}`,
      "condition symbol",
      divForcast
    );

    let spanCondition = e("span", "", "condition", divForcast);

    e("span", `${data.name}`, "forecast-data", spanCondition);
    e(
      "span",
      `${data.forecast.low}${symbol["Degrees"]}/${data.forecast.high}${symbol["Degrees"]}`,
      "forecast-data",
      spanCondition
    );
    e("span", `${data.forecast.condition}`, "forecast-data", spanCondition);
  }

  async function previewUpcoming(code) {
    const urlUpcoming = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

    let res = await fetch(urlUpcoming);
    if (!res.ok) {
      throw new Error("Error: " + res.status);
    }

    let allData = await res.json();

    if (!allData) {
      throw new Error();
    }
    let divForcast = e("div", "", "forecasts-info", upcoming);

    for (const data of allData.forecast) {
      let spanUpcoming = e("span", "", "upcoming", divForcast);

      e("span", `${symbol[data.condition]}`, "symbol", spanUpcoming);

      e(
        "span",
        `${data.low}${symbol["Degrees"]}/${data.high}${symbol["Degrees"]}`,
        "forecast-data",
        spanUpcoming
      );

      e("span", `${data.condition}`, "forecast-data", spanUpcoming);
    }
  }

  function e(type, content, className, parent) {
    const element = document.createElement(type);
    element.textContent = content;
    element.className = className;

    if (parent) {
      parent.appendChild(element);
    }
    return element;
  }
}
attachEvents();
