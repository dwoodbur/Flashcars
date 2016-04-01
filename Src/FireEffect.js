

function FireEffect(pos, scale) {
	var image = new Image();
	image.src = "Res/firesheet.png";
	var frame=10;
	var speed = 2;
	var tick = 0;
	var scale = scale;
	
	this.update = function() {
		tick++;
		if(tick >= speed) {
			tick = 0;
			frame++;
		}
	};
	
	this.draw = function(ctx) {
		var spriteNum = frame%16;
		var row=0;
		if(spriteNum > 11)
			row = 3;
		else if(spriteNum > 7)
			row = 2;
		else if(spriteNum > 3)
			row = 1;
		ctx.drawImage(image, spriteNum%4*200, row*200, 200, 200, pos.x, pos.y, scale*200, scale*200);
	};
}
