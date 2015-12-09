module.exports = function(){
	var options = require('./options');
	var Trello = require("node-trello");
	var t = new Trello(options.storageConfig.apiKey, options.storageConfig.token);

	
	t.get("/1/boards/" + this.boardID + "/lists", function(err, data) {
		if (err) throw err;
		console.log(data);
		console.log(data[0]);
	});

}


