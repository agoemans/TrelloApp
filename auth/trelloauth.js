module.exports = function(){
	var options = require('./options');
	var Trello = require("node-trello");
	var t = new Trello(options.storageConfig.apiKey, options.storageConfig.token);


	//board id 565c9a04a8aa4e237391ec5c'
	t.get("/1/boards/565c9a04a8aa4e237391ec5c/lists", function(err, data) {
		if (err) throw err;
		console.log(data);
		console.log(data[0]);
	});

}


