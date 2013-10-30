// LOAD XML MAPS	

var xhttp = new XMLHttpRequest();
xhttp.open("GET", "map.xml", false);
xhttp.send();
var xml = xhttp.responseXML;

var Map = function() {
	this.data = [];
	this.objects = [];
	this.removed = [];
	
	this.add = function(item) {
		item.mapdata = this;
		this.objects.push(item);
		console.log(this.objects)
		return;
	};
	
	this.remove = function(item){
		var removeOnce = this.removed.indexOf(item) == -1;
		if (removeOnce) {
			this.removed.push(item);
			return true;
		}
		return false;	
	}
	
	this.emptyRemoved = function(){
		this.removed = [];
	}
	
	this.actuallyRemove = function(){
		for (var i=0; i < this.removed.length; i++) {
			var removeFromHere = this.objects.indexOf(this.removed[i]);
			this.objects.splice(removeFromHere, 1);
		}		
		
	}
	
};

Map.prototype.getContent = function (name) {
	var container = Array(),
		section = xml.getElementsByTagName(name)[0],
		columns = section.getElementsByTagName("row");
		
	for (var i=0; i< columns.length; i++) {
		var rows = columns[i].textContent;
		var row = rows.split(',');
		container.push(row);
	  }
	this.data = container;
	return container;
};

Map.prototype.update = function (){
	
	this.emptyRemoved();
	
		for (var l=0; l < this.objects.length; l++) {
			this.objects[l].update();
		}
	
	this.actuallyRemove();
	
};

Map.prototype.render = function (){
	
	if (backgroundready) {
		for (i=0; i <= canvas.width; i+=32) {
			for (j=0; j <= canvas.height; j+=32) {
			context.drawImage(backgroundimage, i, j);
			}
		}
	}
	
	for(var i=0;i<this.data.length;i++) {
	    for(var j=0;j<this.data[i].length;j++) {
			var drawTile = this.data[i][j];
	        context.drawImage(tiles[drawTile], j*32, i*32, 32, 32);
	    }
	}
	
	for (var k=0; k < this.objects.length; k++) {
		this.objects[k].render();
	}

};

var map = new Map();

