function DevButton(x, y, w, h, borderWidth, text, color) {
	
	// Basic data
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.borderWidth = borderWidth;
	this.text = text;
	this.color = color;
	
	this.pointWithin = function(pos) {
		if(pos.x > this.x && pos.x < this.x+this.w) {
			if(pos.y > this.y && pos.y < this.y+this.h) 
				return true;
		}
		return false;
	};
	
	// Update (empty)
	this.update = function() {
		
	};
	
	// Draws border
	this.draw = function(ctx) {
		ctx.fillStyle = "#000000";
		ctx.fillRect(this.x-this.borderWidth, this.y-this.borderWidth, this.w+(2*this.borderWidth), this.h+(2*this.borderWidth));
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.w, this.h);
		ctx.fillStyle = "#000000";
		ctx.font = "bold 20px Arial";
		//ctx.fillText(this.text, this.x, this.y);
		ctx.fillText(this.text, this.x+(this.w/2)-(ctx.measureText(this.text).width/2), this.y+(this.h/2)+5);
	};
}
