var auth = require('./auth/trelloauth.js');
var getJSON = require('./auth/postcards.js');
var http = require('http');
var cardReader = require('./cards/cardupdater.js');
var cardreader = new cardReader();
//getJSON();

//cardreader.loopThruFile();

//auth();


cardreader.loopThruCards();

//cardreader.addTicketNr([{"name":1},{"name":2}]);
//cardreader.getBoardInfo();

console.log("App js finished");