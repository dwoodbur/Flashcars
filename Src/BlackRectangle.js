

function BlackRectangle(pos, size, screenWidth) {
	var pos = pos;
	var size = size;
	var screenWidth = screenWidth;
	
	this.update = function(speed) {
		pos.x -= speed;
		if(pos.x+size.width <= 0)
			pos.x += screenWidth+size.width;
	};
	
	this.draw = function(ctx) {
		ctx.fillStyle = "black";
		ctx.fillRect(pos.x, pos.y, size.width, size.height);
	};
}
