const filterSection = document.getElementById('filterSection');
let gList;
let filtersValues = [];

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

  const checkboxesNode = document.querySelectorAll('.checkbox');
  const checkboxesArray = Array.from(checkboxesNode);
  checkboxesArray.forEach((checkbox) => {
    checkbox.addEventListener('change', selectFilter);
  });
}

function displayFilters(filters, id) {
  const filterList = document.getElementById(id);
  const htmlString = filters.map((item) => {
    return `
    <li>
      <input type="checkbox" id="${item}" class="checkbox" value="${item}">
      <label for="${item}">${item}</label>
      <br>
    </li>`;
  }).join('');
  filterList.innerHTML = htmlString;
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
