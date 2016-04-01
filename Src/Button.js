

function Button(name, pos, size, color, subcolor, highlightColor, font) {
	var name = name;
	var pos = pos;
	var size = size;
	var color = color;
	var subcolor = subcolor;
	var highlightColor = highlightColor;
	var font = font;
	var borderWidth = 2;
	
	var bounds = {x1:pos.x-(size.w/2), x2:pos.x+(size.w/2),
					y1:pos.y-(size.h/2), y2:pos.y+(size.h/2)};
	
	var highlighted = false;
	
	this.update = function() {
		
	};
	
	this.draw = function(ctx) {
		// background
		ctx.fillStyle = "black";
		ctx.fillRect(pos.x-(size.w/2)-borderWidth, pos.y-(size.h/2)-borderWidth, size.w+borderWidth*2, size.h+borderWidth*2);
		// Draw button
		if(highlighted)
			ctx.fillStyle = highlightColor;
		else ctx.fillStyle = color;
		ctx.fillRect(pos.x-(size.w/2), pos.y-(size.h/2), size.w, size.h);
		// Draw label.
		ctx.fillStyle = subcolor;
		ctx.font = font;
		ctx.fillText(name, pos.x-(ctx.measureText(name).width/2), pos.y+(parseInt(font)/4));
	};
	
	/* PUBLIC METHODS */
	
	this.highlight = function() {
		highlighted = true;
	};
	
	this.unhighlight = function() {
		highlighted = false;
	};
	
	this.isHighlighted = function() {
		return highlighted;
	};
	
	this.pointWithin = function(mouse) {
		if(mouse.x > bounds.x1 && mouse.x < bounds.x2 &&
		mouse.y > bounds.y1 && mouse.y < bounds.y2)
			return true;
		return false;
	};
}
