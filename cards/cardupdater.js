var options = require('../auth/options');
var Updatecards = require('../cards/updatecards.js');
var Trello = require("node-trello");
var readCSV = require('../cards/readcsv.js');

function Addcards(){
	this.updater = new Updatecards();
	this.newTrello = new Trello(options.storageConfig.apiKey, options.storageConfig.token);
	this.boardID =  options.storageConfig.boardID;
	this.backlogID = options.storageConfig.backlogID;
	this.InProgressID = options.storageConfig.InProgressID;
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
	console.log("start of loop through file");
	new readCSV(function(output){
	//	console.log(output);
		for (var i = 0; i < output.length; i++) {
			//console.log(output[i][0]);
			//console.log(this.existingTickets);
			//console.log(this.existingTickets.indexOf(output[i][0], 0))
			if (this.existingTickets.indexOf(output[i][0]) != -1) {

				this.filterTicketType(output);
			}

		}
	}, this);
//	console.log("printing temparray");
}

Addcards.prototype.filterTicketType = function (output){
	if (output[i][1] == 'On-hold') {
		this.addMethod(this.cardFilter(output[i][0] + " " + output[i][3] + " " + output[i][6], this.backlogID));
	}

	else if (output[i][1] == 'Open') {
		this.addMethod(this.cardFilter(output[i][0] + " " + output[i][3] + " " + output[i][6], this.InProgressID));
	}
}


Addcards.prototype.loopThruCards = function(){
	// todo - refactor
	this.getCards(this.addTicketNr, this);


}

Addcards.prototype.getCards = function(callback, context){
	// todo - refactor
	var test = "/1/boards/" + this.boardID + "/cards?fields=name,idList,url&key=" + options.storageConfig.apiKey + "&token=" + options.storageConfig.token;
	this.newTrello.get("/1/boards/" + this.boardID + "/cards", function(err, data) {
		if (err) throw err;

			callback.call(this, data);


			//console.log(test);
			//console.log(data[0]);
	});
}
	

Addcards.prototype.addTicketNr = function(list){
	// todo - refactor
	this.existingTickets = [];
	console.log("This is addTicketNr");


	for (var i = 0; i < list.length; i++){
		var temptext = list[i].name.substring(0,3);
		//console.log(temptext);
		this.existingTickets.push(temptext);

	}
	console.log(this.existingTickets)
}

Addcards.prototype.mainCardFunction = function(){
	// todo - refactor
	this.loopThruCards();
	this.loopThruFile();


}




module.exports = Addcards;
