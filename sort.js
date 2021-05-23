const results = document.getElementsByTagName('main')[0];
let gList;

function displayResults(games) {
  const htmlString = games.map((game) => {
    return `
    <img src="${game.Picture}"></img>
    `;
  }).join('');
  results.innerHTML = htmlString;
}
