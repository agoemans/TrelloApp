var options = require('../auth/options');
var Updatecards = require('../cards/updatecards.js');
var Trello = require("node-trello");
var readCSV = require('../cards/readcsv.js');

function Addcards(){
	this.updater = new Updatecards();
	this.newTrello = new Trello(options.storageConfig.apiKey, options.storageConfig.token);
	this.boardID = '565c9a04a8aa4e237391ec5c';
	this.backlogID = '565c9a0a365d03281f25dcac' ;
	this.InProgresID = '565c9a1e02c7e29a9bed63ef';
	this.todoID = '565c9a210f99df919b0b55a0';
	this.doneID = '565c9a24b0170a277ccbcf4d';
	this.idDictionary = {"Backlog":'565c9a0a365d03281f25dcac', 	"In-Progres": '565c9a1e02c7e29a9bed63ef',
		"ToDo" :'565c9a210f99df919b0b55a0', "Done" : '565c9a24b0170a277ccbcf4d'};
	//this.readcsv = new readCSV();

}

Addcards.prototype.getBoardInfo = function(){
	//board id 565c9a04a8aa4e237391ec5c'
	this.newTrello.get("/1/boards/565c9a04a8aa4e237391ec5c/lists", function(err, data) {
		if (err) throw err;
			console.log(data);
			console.log(data[0]);
	});
}

Addcards.prototype.addMethod = function(cardInfo){
	//return {"name": this.name, "pos": this.pos, "idList":this.idList}
	this.newTrello.post("/1/cards", cardInfo, function(err, data) {
		if (err) throw err;
		console.log(err);
	});

}

Addcards.prototype.cardFilter = function(ticketID, idpicker){
	//return {"name": this.name, "pos": this.pos, "idList":this.idList}
	return {"name": ticketID, "pos": this.pos, "idList":idpicker};
}



Addcards.prototype.loopThruFile = function(){
	new readCSV(function(output){
	//	console.log(output);
		for (var i = 0; i < output.length; i++) {
			if (output[i][1] == 'On-hold') {
				this.addMethod(this.cardFilter(output[i][0]+output[i][3], '565c9a0a365d03281f25dcac'));
			}

			if (output[i][1] == 'Open') {
				this.addMethod(this.cardFilter(output[i][0]+output[i][3], '565c9a210f99df919b0b55a0'));
			}
		}
	}, this);
//	console.log("printing temparray");



}

module.exports = Addcards;
