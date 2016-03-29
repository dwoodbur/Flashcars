function DevBorder(canvasWidth, canvasHeight, w, h, color) {
	
	// Basic data
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.w = w;
	this.h = h;
	this.color = color;
	
	// Update (empty)
	this.update = function() {
		
	};
	
	// Draws border
	this.draw = function(ctx) {
		ctx.fillStyle = this.color;
		
		var w = this.w;
		var h = this.h;
		var cw = this.canvasWidth;
		var ch = this.canvasHeight;
		
		ctx.fillRect(0, 0, cw, h);
		ctx.fillRect(0, 0, w, ch);
		ctx.fillRect(cw-w, 0, w, ch);
		ctx.fillRect(0, ch-h, cw, h);
	};
}
