require('should');

var parse = require('csv-parse');
var fs = require("fs");
var input = 'OpenTickets.csv';
var testLine = '';

console.log("test");

testLine = fs.readFileSync(input).toString().split('\n').forEach(function (line) {

	parse(line, {comment: '#'}, function(err, output){
		console.log(output[0])
		return output[0];
	});


});