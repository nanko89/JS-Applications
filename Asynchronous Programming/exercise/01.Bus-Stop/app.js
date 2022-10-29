async function getInfo() {
  const busId = document.querySelector("#stopId").value;
  const url = `http://localhost:3030/jsonstore/bus/businfo/${busId}`;

  const stopName = document.querySelector("#stopName");
  const allBuses = document.querySelector("#buses");

  try {
    const res = await fetch(url);

    if (res.status !== 200) {
      throw new Error("Stop ID not found");
    }

    const data = await res.json();
    allBuses.innerHTML = "";
    stopName.textContent = data.name;
    Object.entries(data.buses).forEach(bus =>
      e("li", `Bus ${bus[0]} arrives in ${bus[1]} minutes`, allBuses)
    );
  } catch (error) {
    stopName.textContent = "Error";
    while (allBuses.firstChild) {
      allBuses.removeChild(allBuses.firstChild);
    }
  }

  function e(type, content, parent) {
    const element = document.createElement(type);
    element.textContent = content;

    if (parent) {
      parent.appendChild(element);
    }
    return element;
  }
}

module.exports = getInfo;
