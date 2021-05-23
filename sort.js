const filterSection = document.getElementById('filterSection');
const playerFilter = document.getElementById('playerFilter');
let gList;
let filtersValues = [];

function displayResults(games) {
  const container = document.getElementsByTagName('main')[0];
  const htmlString = games.map((game) => {
    return `
    <a href="${game.Link}"><img src="${game.Picture}"></img></a>
    `;
  }).join('');
  container.innerHTML = htmlString;
}

function generateFilters() {
  const filtersList = [];
  for (let i = 0; i < gList.length; i++) {
    let game = gList[i];
    for (let j = 0; j < game.Players.length; j++) {
      let filterName = game.Players[j].trim();
      if (!filtersList.includes(filterName) && filterName !== "") {
        filtersList.push(filterName);
      }
    }
  }
  displayFilters(filtersList);

  const checkboxesNode = document.querySelectorAll('.checkbox');
  const checkboxesArray = Array.from(checkboxesNode);
  checkboxesArray.forEach((checkbox) => {
    checkbox.addEventListener('change', selectFilter);
  });
}

function displayFilters(filtersList) {
  const htmlString = filtersList.map((item) => {
    return `
    <li>
      <input type="checkbox" id="${item}" class="checkbox" value="${item}">
      <label for="${item}">${item}</label>
      <br>
    </li>`;
  }).join('');
  playerFilter.innerHTML = htmlString;
}

function selectFilter(e) {
  let filter = e.target;
  if (filter.checked) {
    filtersValues.push(filter.value);
  } else {
    let index = filtersValues.indexOf(filter.value);
    filtersValues.splice(index, 1);
  }
  let searchResult = getResults();
  displayResults(searchResult);
}

function searchFilters(game) {
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
  const filteredBgs = gList.filter((game) => {
    return (
      searchFilters(game)
    );
  });
  return filteredBgs;
}

function includeSearch(array, string) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].toLowerCase().includes(string)) {
      return true;
    }
  }
}
