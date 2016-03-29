function DevSlide(x, y, width, height, colorA, colorB, dir) {
	
	// Basic data
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.colorA = colorA;
	this.colorB = colorB;
	this.dir = dir;
	
	this.selected = false;
	
	this.pointWithin = function(pos) {
		if(pos.x > this.x && pos.x < this.x+this.width) {
			if(pos.y > this.y && pos.y < this.y+this.height)
				return true;
		}
		return false;
	};
	
	// Update (empty)
	this.update = function() {
		
	};
	
	// Draws border
	this.draw = function(ctx) {
		ctx.fillStyle = this.colorA;
		if(this.selected)
			ctx.fillStyle = this.colorB;
		//ctx.fillRect(this.x, this.y, this.width, this.height);
		
		ctx.beginPath();
		if(this.dir == "left") {
			ctx.moveTo(0,0);
			ctx.lineTo(0,600);
			ctx.lineTo(80, 600-50);
			ctx.lineTo(80,50);
		}
		else if(this.dir == "right") {
			ctx.moveTo(1144, 0);
			ctx.lineTo(1144, 600);
			ctx.lineTo(1144-80, 600-50);
			ctx.lineTo(1144-80, 50);
		}
		ctx.closePath();
		ctx.fill();
		
		if(this.selected)
			ctx.fillStyle = "#FFFFFF";
		else ctx.fillStyle = "#000000";
		
		ctx.beginPath();
		if(this.dir == "left") {
			ctx.moveTo(80/3, 50+this.height/2);
			ctx.lineTo(160/3-5, 50+this.height/2+12);
			ctx.lineTo(160/3-5, 50+this.height/2-12);
		}
		else if(this.dir == "right") {
			ctx.moveTo(1144-80/3, 50+this.height/2);
			ctx.lineTo(1144-160/3+5, 50+this.height/2+12);
			ctx.lineTo(1144-160/3+5, 50+this.height/2-12);
		}
		ctx.closePath();
		ctx.fill();
	};
}
