
// function powerUp(){
// 	this.types = ["Bomb", "Speed", "Fire", "Kick"];
// 	this.image;
// 	this.type = this.types[random(this.types.length -1)];
// 	this.x;
// 	this.y;
// 	
// 	this.image = function(){
// 		var pic = new Image();
// 		pic.src = "i/Fire-sprite.png";
// 		this.image = pic.src;
// 	}
// };
// 
// powerUp.prototype.draw = function(){
// 	
// };
// 
// var block = new powerUp();

function PowerUp(x, y, name){	
	this.x = x;
	this.y = y;
	this.name = name;
	this.image = window[name + "img"];
};

PowerUp.prototype.update = function(){
	
	if (collide(this)) {		
		document.querySelector(".message-box").insertBefore(document.querySelector("span." + this.name), document.querySelector(".message-box span"));
		// console.log(this, this.name)
		map.remove(this);
	}
};

PowerUp.prototype.render = function(){
	if (bombready) {
		context.drawImage(this.image, this.x*32, this.y*32);
	}
};

function Message(text, x, y, fsize) {
	this.text = text;
	this.x = x;
	this.y = y;
	this.fontsize = fsize;
		
}

Message.prototype.render = function(){
	// context.fillStyle = '#62B1F6';
	// context.fillRect(this.x, this.y, this.textlength, 30);
	
	context.fillStyle = '#000';
	context.font = this.fontsize + 'px Lucida Console, Monaco, monospace';
	context.textBaseline = 'top';
	context.textAlign = "start";
	context.fillText(this.text, this.x, this.y);
};

var tardis = false;
var gameover = false;