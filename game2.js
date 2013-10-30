
var canvas = document.createElement("canvas");
canvas.setAttribute("id","stage");
var context = canvas.getContext("2d");
canvas.width = (32 * 12); // 385
canvas.height = (32 * 12); // 385
document.body.appendChild(canvas);

// Unleash the buffer!

var bufferCanvas = document.createElement("canvas");
var buffer = bufferCanvas.getContext("2d");

var backgroundready = false;
var backgroundimage = new Image();
backgroundimage.onload = function() {
	backgroundready = true;
};
backgroundimage.src = "grass.png";

var heroready = false;
var heroimage = new Image();
heroimage.onload = function() {
	 heroready = true;
};
heroimage.src = "hero-sprite3.png";

var heroattackready = false;
var heroattackimage = new Image();
heroattackimage.onload = function() {
	 heroattackready = true;
};
heroattackimage.src = "hero2.png";

var monsterready = false;
var monsterimage = new Image();
monsterimage.onload = function() {
	 monsterready = true;
};
monsterimage.src = "monster2.png";

var waterready = false;
var waterimg = new Image();
waterimg.onload = function() {
	waterready = true;
}; 
waterimg.src = "water.png";

var groundready = false;
var groundimg = new Image();
groundimg.onload = function() {
	groundready = true;
}; 
groundimg.src = "grass.png";

var player = {
	speed: 0.5,
	x: 100,
	y: 100,
	h: 32,
	w: 32,
	sx: 32,
	sy: 0,
	dx: 1,
	dy: 1,
	colliding: false,
	hit: false,
	stopinput: 0
};

var monster = {
	autospeed: 0.2,
	x: 50,
	y: 50,
	dx: 1,
	dy: 1
};

var wall = {
	h: 32,
	w: 32
};

// LOAD XML MAPS	

var xhttp = new XMLHttpRequest();
xhttp.open("GET", "map.xml", false);
xhttp.send();
var xml = xhttp.responseXML;

var getContent = function (name) {
	var container = Array();
	var section = xml.getElementsByTagName(name)[0];
	for (i=0; i<section.getElementsByTagName("row").length; i++) {
		var rows = section.getElementsByTagName("row")[i].textContent;
		var rowsplit = rows.split(',');
		container.push(rowsplit);
		}
		return container;
};

var map = getContent('groundTiles');
//var objectmap = getContent('objectTiles');

var tiles = new Array(groundimg, waterimg, monsterimage);
//var objecttiles = new Array(groundimg, waterimg, monsterimage);

// ASSIGN MOVEMENT KEYS

var keysDown = {};
var rightkey, leftkey, upkey, downkey = false;

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
	var rightkey, leftkey, upkey, downkey = false;
}, false);


function move() {
	
	for (var y=0; y < map.length; y++) {
	    for (var x=0; x < map[y].length; x++) {
		if (map[y][x] > 0) {
			var yoff = y * 32;
			var xoff = x * 32;
			//collide();
			}
		}
	}
	
	var isWallAtCoords = function(y, x){
		console.log(y, x)
		y = Math.floor(y / 32);
		x = Math.floor(x / 32);
		console.log(y, x, map[y][x])
		return map[y][x];
	};
	
	// if ( isWallAtCoords(player.y, player.x) ) 
	// 	{ 
	// 		console.log(x + " " + y + " " + objectmap[y][x]);
	// 		console.log("Collide!");
	// 	}

	 function collide() {
		if (player.x <= (xoff + 32) && 
			player.y <= (yoff + 32) &&
			xoff <= (player.x + 32) &&
			yoff <= (player.y + 32) ) 
				{
					console.log("Collide!");
					player.colliding = true;
					if (player.dy ) { // down
						player.y -= player.speed;
						player.colliding == false;
					}
					if (!player.dy) { // up
						player.y += player.speed;
						player.colliding == false;
					}
					if (player.dx) { // right
						player.x -= player.speed;
						player.colliding == false;
					}
					if (!player.dx) { // left
						player.x += player.speed;
						player.colliding == false;
					}
					return true;
				}
	}

	
	if (player.stopinput <= 0) {
		if (38 in keysDown) { // up
			console.log(player.y, player.x)
			upkey = true;
			player.sx = 0;
			player.sy = 96;
			player.dy = 0;
			if (player.y <= 0) {
					player.y += player.speed;
				} else {
					player.y -= player.speed;
				}
			
		}
		if (40 in keysDown) { // down
			downkey = true;
			player.sx = 0;
			player.sy = 0;
			player.dy = 1;
			if (player.y >= (canvas.height - 32)) {
				player.y -= player.speed;
			} else {
				player.y += player.speed;
			}
		}
		if (37 in keysDown) { // left
			leftkey = true;
			player.sx = 0;
			player.sy = 32;
			player.dx = 0;
			if (player.x <= 0) {
				player.x += player.speed;
			} else {
				player.x -= player.speed;
			}
		}
		if (39 in keysDown) { // right
			// isWallAtCoords(player.x, player.y)
			rightkey = true;
			player.sx = 0;
			player.sy = 64;
			player.dx = 1;
			if (player.x >= canvas.width - 32) {
				player.x -= player.speed;
			} else {
				player.x += player.speed;
			}	
		}
		if (32 in keysDown) {
			jump();
		}
	} else {
		player.stopinput -= 1;
	}	

	// Jump!

	jumping = false;

	function jump() {
		if (!jumping) {
			player.y -= player.speed;
			setTimeout(stopjump, 50);
		}
	}
	
	function stopjump() {
		player.y += player.speed;
		jumping = false;
	}
	
	// Monster collision
	
	if (player.x <= (monster.x + 32) && 
		player.y <= (monster.y + 32) &&
		monster.x <= (player.x + 32) &&
		monster.y <= (player.y + 32) )
			{ 
				console.log("Hit!");
				
				// if (player.x + 32 >= canvas.width -32) {
				// 		player.x = (canvas.width - 32);
				// 	} else { 
				// 		player.x = (player.x + 32);
				// 	};
				
				player.stopinput = 220;
					
				player.x = (parseInt(player.x + 32, 0) >= canvas.width - 32) ? (canvas.width - 32) : parseInt(player.x + 32, 0);
				
				player.y = (player.y + 20 >= canvas.height -32) ? (canvas.height - 32) : (player.y + 20); 
					
				window.setTimeout(function(){ 
					thehit(5);
				}, 100);
				
				var thehit = function(i) {
					player.hit = (i % 2 == 0) ? true : false;
					i--;
					if (i > 0) {
						window.setTimeout(function(){ 
							thehit(i); 
						}, 300);
					} else {
						reset();
					}
				};
			}
};

function clearContext() {
	// context.clearRect(0,0, canvas.width, canvas.height);
};

function render() {
	clearContext();
	
	if (backgroundready) {
		for (i=0; i <= canvas.width; i+=32) {
			for (j=0; j <= canvas.height; j+=32) {
			context.drawImage(backgroundimage, i, j);
			}
		}
	}
	
	for(var i=0;i<map.length;i++) {
	    for(var j=0;j<map[i].length;j++) {
			var drawTile = map[i][j];
			// var drawObject = objectmap[i][j];
	        context.drawImage(tiles[drawTile], j*32, i*32, 32, 32);
			// if (drawObject > 0) {
			// 	context.drawImage(objecttiles[drawObject-1], j*32, i*32);
			// }
	    }
	}
	
	if (heroready) {
		context.drawImage(heroimage, player.sx, player.sy, player.w, player.h, player.x, player.y, player.w, player.h);
	}
	
	if (monsterready) {
		context.drawImage(monsterimage, monster.x, monster.y);
	}

	if (heroattackready && typeof bufferCanvas !== "undefined" && player.hit == true) {
		context.drawImage(bufferCanvas, player.x, player.y); 
	}
	if (heroready) {
		buffer.drawImage(heroimage, player.sx, player.sy, player.w, player.h, 0, 0, player.w, player.h);
		buffer.save();
		buffer.globalCompositeOperation = "source-in";
		buffer.fillStyle = "rgba(186, 51, 35, 0.6)";
		buffer.fillRect(0, 0, heroimage.width, heroimage.height);
		buffer.restore();
	}
};

function animate() {
	if (monster.x >= canvas.width - 32 || monster.x <= 0) {
		monster.dx *= -1;
	}
	if (monster.y >= canvas.height - 32 || monster.y <= 0) {
		monster.dy *= -1;
	}
	
	//monster.x += (monster.autospeed * monster.dx);
	//monster.y += (monster.autospeed * monster.dy);
	
	// monster.x += (player.x - monster.x) / 4000;
	// current = (destination - target) % speed;
	// monster.y += (player.y - monster.y) / 4000;
};

function reset() {
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
	
	// player.x = canvas.width / 2;
	// player.y = canvas.height / 2;
	player.hit = false;
}

function init() {
	animate();
	move();
	render();
};

// reset();
setInterval(init, 1);
