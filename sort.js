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

function generateFilters() {
  const playersList = getFilterList("Players").sort((a,b) => a-b);
  const typeList = getFilterList("Type");
  const priceList = getFilterList("Price");
  const platList = getFilterList("Platform");

  displayFilters(playersList, "playerFilter");
  displayFilters(typeList, "typeFilter");
  displayFilters(priceList, "priceFilter");
  displayFilters(platList, "platFilter");

  const filters = document.getElementsByTagName('select');
  for (let i = 0; i < filters.length; i++) {
    filters[i].addEventListener('change', function() {
      let searchResult = getResults();
      displayResults(searchResult);
    });
  }
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

function getFiltersValues() {
  const values = [];
  const filters = document.getElementsByTagName('select');

  for (let i = 0; i < filters.length; i++) {
    values.push(filters[i].value);
  };
  return values;
}

function searchFilters(category, filter) {
  if (filter !== "") {
    for (let i = 0; i < category.length; i++) {
      if (category[i] == filter) {
        return true;
      }
    }
  }
  else {return true;}
}

// Returns array of games that match the selected filters
function getResults() {
  const filteredGames = gList.filter((game) => {
    const filters = getFiltersValues();
    return (
      searchFilters(game.Players, filters[0]) &&
      searchFilters(game.Type, filters[1]) &&
      searchFilters(game.Complexity, filters[2]) &&
      searchFilters(game.Price, filters[3]) &&
      searchFilters(game.Platform, filters[4])
    );
  });
  return filteredGames;
}
