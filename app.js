var auth = require('./auth/trelloauth.js');
var getJSON = require('./auth/postcards.js');
var http = require('http');
var cardReader = require('./cards/cardupdater.js');
var cardreader = new cardReader();
//getJSON();

//cardreader.loopThruFile();

auth();

console.log("App js finished");