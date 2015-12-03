module.exports = function(){
	var options = require('./options');
	var Updatecards = require('../cards/updatecards.js');
	var updater = new Updatecards();
	var Trello = require("node-trello");
	var t = new Trello(options.storageConfig.apiKey, options.storageConfig.token);


	//board id 565c9a04a8aa4e237391ec5c'
	t.post("/1/cards", updater.addToCard(), function(err, data) {
		if (err) throw err;
		console.log(data);
	});

}
