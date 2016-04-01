

function Car(pos, size) {
	var pos = pos;
	var size = size;
	var image = new Image();
	image.src = "Res/car_side.png";
	var target = null;
	var dy = 7;
	
	this.update = function() {
		// move to target if not there yet
		if(target != null) {
			if(pos.y > target)
				pos.y = Math.max(target, pos.y-dy);
			else pos.y = Math.min(target, pos.y+dy);
			
			if(pos.y == target)
				target = null;
		}
	};
	
	this.draw = function(ctx) {
		ctx.drawImage(image, pos.x-size.width/2, pos.y-size.height/2-20);
	};
	
	/* PUBLIC METHODS */
	
	this.moveTo = function(yVal) {
		target = yVal;
	};
	
	this.setX = function(newX) {
		pos.x = newX;
	};
	
	this.setY = function(newY) {
		pos.y = newY;
	};
	
	this.x = function() {
		return pos.x;
	};
	this.y = function() {
		return pos.y;
	};
	
	this.driveForward = function(pixels) {
		pos.x += pixels;
	};
}
