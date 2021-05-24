const filterSection = document.getElementById('filterSection');
let gList;
// let filtersValues = [];

function displayResults(games) {
  const container = document.getElementsByTagName('main')[0];
  const htmlString = games.map((game) => {
    return `
    <a href="${game.Link}" target="_blank"><img src="${game.Picture}"></img></a>
    `;
  }).join('');
  container.innerHTML = htmlString;
}

// function generateFilters() {
//   // iterates through every game
//   for (let i = 0; i < gList.length; i++) {
//     let game = gList[i];
//     for (const key in game) {
//       let name = game[key].trim();
//     }
//   }
// }

function generateFilters() {
  const playersList = [];
  const typeList = [];
  for (let i = 0; i < gList.length; i++) {
    let game = gList[i];
    for (let j = 0; j < game.Players.length; j++) {
      let players = game.Players[j].trim();
      if (!playersList.includes(players) && players !== "") {
        playersList.push(players);
      }
    }

    let type = game.Type;
    if (!typeList.includes(type) && type !== "") {
        typeList.push(type);
    }
  }
  displayFilters(playersList, "playerFilter");
  displayFilters(typeList, "typeFilter");

  const filtersNode = document.querySelectorAll('select');
  const filtersArray = Array.from(filtersNode);
  filtersArray.forEach((filter) => {
    filter.addEventListener('change', function() {
      let searchResult = getResults();
      displayResults(searchResult);
    });
  });
}

function displayFilters(filters, id) {
  const filterList = document.getElementById(id);
  const htmlString = filters.map((item) => {
    return `
    <option value="${item}">${item}</option>
    `;
  }).join('');
  filterList.innerHTML += htmlString;
}

function searchFilters(game) {
  const filtersValues = [];
  const filtersNode = document.querySelectorAll('select');
  const filtersArray = Array.from(filtersNode);
  filtersArray.forEach((filter) => {
    if (filter.value !== "") {
      filtersValues.push(filter.value);
    }
  });

  if (filtersValues.length > 0) {
    for (let i = 0; i < game.Players.length; i++) {
      let mode = game.Players[i];
      for (let j = 0; j < filtersValues.length; j++) {
        if (mode == filtersValues[j]) {
          return true;
        }
      }
    }
  } else {
    return true;
  }
}

function getResults() {
  const filteredGames = gList.filter((game) => {
    return (
      searchFilters(game)
    );
  });
  return filteredGames;
}
