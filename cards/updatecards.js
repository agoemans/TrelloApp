function Updatecards(id, idList){
	this.idList = "565c9a0a365d03281f25dcac";
	this.name = "This is a second new card";
	this.pos = "top";
}

Updatecards.prototype.addToCard = function () {
	return {"name": this.name, "pos": this.pos, "idList":this.idList}

	/**/
};



module.exports = Updatecards;