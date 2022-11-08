const calendar = document.querySelector("#years");
const sections = document.querySelectorAll("section");

sections.forEach(section => (section.style.display = "none"));

calendar.style.display = "block";
calendar.addEventListener("click", e => {
  e.preventDefault();
  const year = e.target.querySelector(".date").textContent;
  const sectionYear = document.querySelector(`#year-${year}`);

  changeVisible(calendar, sectionYear);

  sectionYear.addEventListener("click", e => {
    e.preventDefault();
    if (e.target.tagName == "CAPTION") {
      changeVisible(sectionYear, calendar);
    } else {
      const monthOfYear = e.target.querySelector(".date").textContent;
      const month = monthToNumber(monthOfYear);
      const sectionMonth = document.querySelector(`#month-${year}-${month}`);

      changeVisible(sectionYear, sectionMonth);

      sectionMonth.addEventListener("click", e => {
        e.preventDefault();
        if (e.target.tagName == "CAPTION") {
          changeVisible(sectionMonth, sectionYear);
        }
      });
    }
  });
});

function changeVisible(first, second) {
  first.style.display = "none";
  second.style.display = "block";
}

function monthToNumber(month) {
  const allMonths = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sept: 9,
    Oct: 10,
    Noe: 11,
    Dec: 12,
  };
  return allMonths[month];
}
