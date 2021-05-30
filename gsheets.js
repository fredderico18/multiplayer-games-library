function start() {
  // Initializes the Google Sheets API library.
  gapi.client.init({
    'apiKey': 'AIzaSyDaGUPSr4asMfHt_Qlie01vzbpl8B35nBo',
    'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    'clientId': '37348095959-i0nd20ns5vklh6q2drb7mf2am83vqou4.apps.googleusercontent.com',
    'scope': 'https://www.googleapis.com/auth/spreadsheets.readonly',
  }).then(function() {
    parseSheet();
  });
};

function parseSheet() {
  // Reads values on the spreadsheet, starting from row 2.
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: "1oRzxusNcYxLjyTHjwbiRKlFZiu4I9dYZf1a9I8YIeP4",
    range: "A2:Z"
  }).then((response) => {
    let completeList = response.result.values;
    let list = [];
    for (let i=0; i < completeList.length; i++) {
      let game = new Game(completeList[i]);
      list.push(game);
    }
    gList = list;
    generateFilters();
    displayResults(gList);
  });
}

function Game(game) {
  this.Game = game[0];
  this.Players = splitArray(game[1]);
  this.Type = splitArray(game[2]);
  this.Complexity = game[3];
  this.Tags = splitArray(game[4]);
  this.Price = game[5];
  this.Platform = game[6];
  this.Picture = game[7];
  this.Link = game[8];
  this.Video = game[9];
}

function splitArray(array) {
  if (array) {
    return (array.length > 1) ? array.split(",") : array;
  } else {return "";}
}

// Loads the Google Sheets API library.
gapi.load('client', start);
