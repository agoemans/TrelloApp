function Updatecards(id, idList){
	this.name = "This is a second new card";
	this.pos = "top";
}

Updatecards.prototype.addToCard = function () {
	return {"name": this.name, "pos": this.pos, "idList":this.idList}

	/**/
};



module.exports = Updatecards;