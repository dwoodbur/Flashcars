

function Cop(pos) {
	var pos = pos;
	var image1 = new Image();
	image1.src = "Res/cops3blue.png";
	var image2 = new Image();
	image2.src = "Res/cops3red.png";
	var images = [image1, image2];
	var curImage = 0;
	var target;
	var speed;
	var ticks = Math.floor(Math.random()*4+3);
	
	this.update = function(newY) {
		// move to given y
		pos.y = newY;
		// advance animation
		ticks++;
		if(ticks == 10) {
			ticks = 0;
			curImage++;
			if(curImage == 2)
				curImage = 0;
		}
	};
	
	this.draw = function(ctx) {
		ctx.drawImage(images[curImage], pos.x, pos.y, images[curImage].width*.75, images[curImage].height*.75);
	};
	
	/* PUBLIC METHODS */
	
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
