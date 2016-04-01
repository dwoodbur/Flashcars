

function Cop(pos) {
	var pos = pos;
	var image = new Image();
	image.src ="Res/cops3.png";
	var target;
	var speed;
	
	this.update = function(newY) {
		pos.y = newY;
	};
	
	this.draw = function(ctx) {
		ctx.drawImage(image, pos.x, pos.y, image.width*.75, image.height*.75);
	};
	
	this.driveForward = function(pixels) {
		pos.x += pixels;
	};
	this.driveBack = function(pixels) {
		pos.x -= pixels;
	};
	
	this.x = function() {
		return pos.x;
	};
	
	this.setX = function(newX) {
		pos.x = newX;
	};
	
	this.setY = function(newY) {
		pos.y = newY;
	};
	
	this.pos = function() {
		return pos;
	};
	
}
