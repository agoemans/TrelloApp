var options = require('../auth/options');
var Updatecards = require('../cards/updatecards.js');
var Trello = require("node-trello");
var readCSV = require('../cards/readcsv.js');

function Addcards(){
	this.updater = new Updatecards();
	this.newTrello = new Trello(options.storageConfig.apiKey, options.storageConfig.token);
	this.boardID =  options.storageConfig.boardID;
	this.backlogID = options.storageConfig.backlogID ;
	this.InProgresID = options.storageConfig.InProgresID;

}

Addcards.prototype.getBoardInfo = function(){
	
	this.newTrello.get("/1/boards/" + this.boardID + "/lists", function(err, data) {
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
				this.addMethod(this.cardFilter(output[i][0] + " " + output[i][3] + " " + output[i][6], this.backlogID));
			}

			if (output[i][1] == 'Open') {
				this.addMethod(this.cardFilter(output[i][0] + " " + output[i][3] + " " + output[i][6], this.InProgresID));
			}
		}
	}, this);
//	console.log("printing temparray");



}

module.exports = Addcards;
