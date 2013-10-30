
var canvas = document.createElement("canvas");
canvas.setAttribute("id","stage");
var context = canvas.getContext("2d");
canvas.width = (32 * 12); // 385
canvas.height = (32 * 12); // 385
document.body.insertBefore(canvas, document.querySelector(".message-box"));

// Unleash the buffer!

var bufferCanvas = document.createElement("canvas");
var buffer = bufferCanvas.getContext("2d");

var fireready = false;
var fireimage = new Image();
fireimage.onload = function() {
	fireready = true;
};
fireimage.src = "i/Fire-sprite.png";

var bombready = false;
var bombimage = new Image();
bombimage.onload = function() {
	bombready = true;
};
bombimage.src = "i/Bomb-sprite.png";

var backgroundready = false;
var backgroundimage = new Image();
backgroundimage.onload = function() {
	backgroundready = true;
};
backgroundimage.src = "i/grass.png";

var heroready = false;
var heroimage = new Image();
heroimage.onload = function() {
	 heroready = true;
};
heroimage.src = "i/hero-sprite3.png";

var heroattackready = false;
var heroattackimage = new Image();
heroattackimage.onload = function() {
	 heroattackready = true;
};
heroattackimage.src = "i/hero2.png";

var monsterready = false;
var monsterimage = new Image();
monsterimage.onload = function() {
	 monsterready = true;
};
monsterimage.src = "i/monster2.png";

var waterready = false;
var waterimg = new Image();
waterimg.onload = function() {
	waterready = true;
}; 
waterimg.src = "i/water.png";

var groundready = false;
var groundimg = new Image();
groundimg.onload = function() {
	groundready = true;
}; 
groundimg.src = "i/grass.png";

var sdready = false;
var superduperimg = new Image();
superduperimg.onload = function() {
	sdready = true;
}; 
superduperimg.src = "i/SuperDuper-sprite.png";

var bdready = false;
var cakeimg = new Image();
cakeimg.onload = function() {
	bdready = true;
}; 
cakeimg.src = "i/Cake-sprite2.png";

var chready = false;
var chineseimg = new Image();
chineseimg.onload = function() {
	chready = true;
}; 
chineseimg.src = "i/vancouver-sprite.png";

var chready = false;
var tardisimg = new Image();
tardisimg.onload = function() {
	chready = true;
}; 
tardisimg.src = "i/Tardis-sprite2.png";

var groundready = false;
var bushimg = new Image();
bushimg.onload = function() {
	groundready = true;
}; 
bushimg.src = "i/bush.png";

// LOAD XML MAPS	

map.getContent('groundTiles');
var tiles = new Array(waterimg, groundimg, bushimg);

map.add(new PowerUp(4, 4, "superduper"));
map.add(new PowerUp(7, 7, "cake"));
map.add(new PowerUp(9, 1, "chinese"));

// ASSIGN MOVEMENT KEYS

var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

function canMoveOnMap(y, x){
	if (map.data[y][x] != 0 && map.data[y][x] != 2) {
		return true;
		}
	return false;
};

function collide(object){
	if (player.x <= (object.x) && 
		player.y <= (object.y) &&
		object.x <= (player.x) &&
		object.y <= (player.y) ) {
				return true;
			}
};

function update() {
	map.update();
	player.update();
	
	if ((map.objects == false) && (player.timetraveller == false) && (player.frame % 1200 == 0)) {
		tardisFlash();
	}
	if ((map.objects == false) && (player.timetraveller == true)) {
		gameover = true;
		document.querySelector(".message-box").insertBefore(document.querySelector("span.endtardis"), document.querySelector(".message-box span"));
	}
	
	// this.welcomemessage = new Message("HELLO BIRTHDAY [INSERT GENDER HERE]! I HOPE YOU LIKE CAKE. THERE'S LOTS OF CAKE. ACTUALLY, THERE'S ONLY CAKE. GRAB THE CAKE.", canvas.width / 2 - 150, 100, 15);
};

function render() {
	map.render();
	
	if (!gameover) {
		player.render();
	}	
	
	if (monsterready) {
		// context.drawImage(monsterimage, monster.x, monster.y);
	}
	
	if (tardis) {
		context.fillStyle = "rgba(16,35,114,1)";
		context.fillRect(32,32,canvas.width -64,canvas.height -64);
	}
	
	// if (this.welcomemessage) {
	// 	this.welcomemessage.render();
	// }
	
};

function init() {
	
	(function animloop(){
	      requestAnimFrame(animloop);
			update();
			render();
	 })();
};

init();