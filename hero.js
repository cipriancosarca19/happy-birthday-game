
function Character(){
	this.speed = 0.2,
	this.x = 50,
	this.y = 50,
	this.vx = 0, 
    this.vy = 0,
	this.dx = 1,
	this.dy = 1,
	this.frame = 0
};

Character.prototype.move = function(dir){
	if (dir == "UP") {
		this.sy = 96;
		if (canMoveOnMap(this.y-1,this.x)) {
			this.vy = -this.speed;
			this.vx = 0;
			this.moving = true;
		}
	}
	if (dir == "DOWN") {
		this.sy = 0;
		if (canMoveOnMap(this.y+1,this.x)) {
			this.vy = this.speed;
			this.vx = 0;
			this.moving = true;
		}
	}
	if (dir == "LEFT") {
		this.sy = 32;
		if (canMoveOnMap(this.y,this.x-1)) {
			this.vy = 0;
			this.vx = -this.speed;
			this.moving = true;
		}
	}
	if (dir == "RIGHT") {
		this.sy = 64;
		if (canMoveOnMap(this.y,this.x+1)) {
			this.vy = 0;
			this.vx = this.speed;
			this.moving = true;
		}
	}
};

Character.prototype.update = function(){
	
	this.frame += 1;
	
	if (this.moving == true) {
		this.py += this.vy;
		this.px += this.vx;
		
		if (this.py % 32 == 0 && this.px % 32 == 0) {
			this.x = this.px / this.w;
			this.y = this.py / this.w;
			this.moving = false;
		} else {
            return;
        }
	}
	
	// Must be here and below above code (so that function returns when moving to next ends and stops keypress registering)
	
	if (38 in keysDown) {
        player.move("UP");
	}
	if (40 in keysDown) {
        player.move("DOWN");
	}
	if (37 in keysDown) {
        player.move("LEFT");
	}
	if (39 in keysDown) {
        player.move("RIGHT");
	}

	// if (68 in keysDown && player.drop) {
	// 	player.drop = false;
	// 	map.add(new PowerUp(player.x +1, player.y));
	// 	window.setTimeout(player.canDrop, 500);
	// }

};

Character.prototype.render = function(){
		context.drawImage(heroimage, this.sx, this.sy, this.w, this.h, this.px, this.py, this.w, this.h);
};

function Player(){
	this.speed = 2,
	this.x = 1,
	this.y = 1,
	this.h = 32,
	this.w = 32,
	this.px = this.x * this.w,
	this.py = this.y * this.w,
	this.sx = 0,
	this.sy = 0,
	this.colliding = false,
	this.hit = false,
	this.moving = false,
	this.stopinput = 0,
	this.drop = true,
	this.timetraveller = false
	
	this.canDrop = function(){
		return player.drop = true;
	}
	
	// need add and remove functions for adding bombs or powerups
};

Player.prototype.update = function(){

}

Player.prototype.powerUps = function(){
	
}

function Monster(){
	this.autospeed = 0.2,
	this.x = 50,
	this.y = 50,
	this.dx = 1,
	this.dy = 1
};

Player.prototype = new Character();
Monster.prototype = new Character();

var player = new Player();
var monster = new Monster();