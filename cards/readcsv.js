require('should');
module.exports = function(callback, context){
	var parse = require('csv-parse');
	var fs = require("fs");
	var input = '../TrelloApp/cards/OpenTickets.csv';
	var testLine = '';

	console.log("test");

	testLine = fs.readFileSync(input);

	//.forEach(function (line) {

		parse(testLine, {comment: '#'}, function(err, output){

			callback.call(context, output);


		});


	//});

}




