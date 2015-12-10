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
	this.existingTickets = [];

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


Addcards.prototype.loopThruCards = function(){
	// delete later --- only for testing
	this.getCards(this.addTicketNr, this);


}

Addcards.prototype.getCards = function(callback, context){
	// delete later --- only for testing	
	var test = "/1/boards/" + this.boardID + "/cards?fields=name,idList,url&key=" + options.storageConfig.apiKey + "&token=" + options.storageConfig.token;
	this.newTrello.get("/1/boards/" + this.boardID + "/cards", function(err, data) {
		if (err) throw err;
		
			//console.log(data);
			
			callback.call(data, this);


			//console.log(test);
			//console.log(data[0]);
	});
}
	

Addcards.prototype.addTicketNr = function(list){
	// delete later --- only for testing	
	console.log("This is addTicketNr");
	console.log(list)
	for (var i = 0; i < list.length; i++){
		console.log(list[i].name);
	}
}
	


module.exports = Addcards;
