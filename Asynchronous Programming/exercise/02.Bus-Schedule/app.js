function solve() {
  const departBtn = document.querySelector("#depart");
  const arriveBtn = document.querySelector("#arrive");

  const info = document.querySelector("#info span");
  let id = "depot";
  const url = `http://localhost:3030/jsonstore/bus/schedule/${id}`;

  async function depart() {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Invalid bus id");
      }
      const data = await response.json();

      departBtn.disabled = true;
      arriveBtn.disabled = false;

      info.textContent = `Next stop ${data.name}`;
    } catch (err) {
      info.textContent = "Error";
      departBtn.disabled = true;
      arriveBtn.disabled = true;
    }
  }

  async function arrive() {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Invalid bus id");
      }

      const data = await response.json();

      departBtn.disabled = false;
      arriveBtn.disabled = true;

      info.textContent = `Arriving at ${data.name}`;
    } catch (err) {
      info.textContent = "Error";
      departBtn.disabled = true;
      arriveBtn.disabled = true;
    }
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
