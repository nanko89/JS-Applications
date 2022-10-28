//-----------------AJAX

// function loadRepos() {
// 	  let username = document.querySelector("#username").value;
// 	  let repos = document.querySelector("#repos");

// 	  fetch(`https://api.github.com/users/${username}/repos`)
// 	    .then(handleResponse)
// 	    .then(displayData)
// 	    .catch(handlerError);

// 	  function handleResponse(response) {
// 	    if (!response.ok) {
// 	      throw new Error(`${response.status} ${response.statusText}`);
// 	    }
// 	    return response.json();
// 	  }

// 	  function displayData(data) {
// 	    repos.innerHTML = "";
// 	    for (let repo of data) {
// 	      repos.innerHTML += `<li><a href="${repo.html_url}">${repo.full_name}</a></li>`;
// 	    }
// 	  }

// 	  function handlerError(error) {
// 	    repos.innerHTML = `${error.message}`;
// 	  }
// 	}

// -----------Async

async function loadRepos() {
  let username = document.querySelector("#username").value;
  let repos = document.querySelector("#repos");

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    repos.innerHTML = "";

    for (let repo of data) {
      repos.innerHTML += `<li><a href="${repo.html_url}">${repo.full_name}</a></li>`;
    }
  } catch (error) {
    repos.innerHTML = `${error.message}`;
  }
}
