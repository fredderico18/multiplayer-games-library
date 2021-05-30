const filterSection = document.getElementById('filterSection');
let gList;

function displayResults(games) {
  const container = document.getElementsByTagName('main')[0];
  const htmlString = games.map((game) => {
    return `
    <a href="${game.Link}" target="_blank" rel="noopener noreferrer">
    <img src="${game.Picture}"></img></a>
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
  const playersList = getFilterList("Players");
  const typeList = getFilterList("Type");

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

function getFilterList(category) {
  const list = [];
  for (let i = 0; i < gList.length; i++) {
    let game = gList[i];
    for (let j = 0; j < game[category].length; j++) {
      let key = game[category];
      let item = key[j];
      if (!list.includes(item) && !item=="") {
        list.push(item);
      }
    }
  }
  return list;
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

function getFilters() {
  const values = [];
  const filtersNode = document.querySelectorAll('select');
  const filtersArray = Array.from(filtersNode);
  filtersArray.forEach((filter) => {
    values.push(filter.value);
  });
  return values;
}

function searchFilters(category) {
  const filtersValues = getFilters();
  for (let i = 0; i < category.length; i++) {
    let mode = category[i];
    for (let j = 0; j < filtersValues.length; j++) {
      if (mode == filtersValues[j]) {
        return true;
      }
    }
  }
}

// Returns array of games that match the selected filters
function getResults() {
  const filteredGames = gList.filter((game) => {
    return (
      searchFilters(game.Players) &&
      searchFilters(game.Type)
    );
  });
  return filteredGames;
}
