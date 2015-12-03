
var getJSON = require('./auth/postcards.js');
var http = require('http');
var cardReader = require('./cards/cardupdater.js');
var cardreader = new cardReader();
//getJSON();

cardreader.loopThruFile();

console.log("App js finished");