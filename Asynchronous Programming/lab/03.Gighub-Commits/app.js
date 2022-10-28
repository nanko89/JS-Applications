function loadCommits() {
  const username = document.querySelector("#username").value;
  const repos = document.querySelector("#repo").value;
  const commits = document.querySelector("#commits");

  fetch(`https://api.github.com/repos/${username}/${repos}/commits`)
    .then(handleResponse)
    .then(displayData)
    .catch(handlerError);

  function handleResponse(response) {
    if (!response.ok) {
      throw new Error(`Error: ${response.status} (${response.statusText})`);
    }
    return response.json();
  }

  function displayData(data) {
    commits.innerHTML = "";
    for (const { commit } of data) {
      commits.innerHTML += `<li>${commit.author.name}: ${commit.message}</li>`;
    }
  }

  function handlerError(error) {
    commits.innerHTML = `Error ${error.message}`;
  }
}

// async function loadCommits() {
//   const username = document.querySelector("#username").value;
//   const repos = document.querySelector("#repo").value;
//   const commits = document.querySelector("#commits");

//   try {
//     const response = await fetch(
//       `https://api.github.com/repos/${username}/${repos}/commits`
//     );

//     if (!response.ok) {
//       throw new Error(`${response.status} ${response.statusText}`);
//     }

//     const data = await response.json();

//     for (let { commit } of data) {
//       commits.innerHTML += `<li>${commit.author.name}: ${commit.message}</li>`;
//     }
//   } catch (error) {
//     commits.innerHTML = `${error.message}`;
//   }
// }
