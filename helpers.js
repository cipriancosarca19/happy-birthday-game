window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
})();

// Birthday functions

function tardisFlash(){
	player.timetraveller = true;
	var timer = window.setInterval(tardisIsReal, 350);	
	var count = 0;
	map.add(new PowerUp(6, 8, "tardis"));
	document.querySelector(".message-box").insertBefore(document.querySelector("span.tardis"), document.querySelector(".message-box span"));
		
	function tardisIsReal(){
		if (count >=6){
			window.clearInterval(timer);
			tardis = false;
			return;
		}
		tardis == true ? tardis = false : tardis = true;
		count++;
	};
};