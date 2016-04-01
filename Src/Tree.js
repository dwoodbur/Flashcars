

function Tree(pos) {
	var pos = pos;
	var image = new Image();
	image.src = "Res/apple_tree.png";
	// min 160 max 250
	var scale = 1-(250 - pos.y)/90+.1;
	//scale = scale/scale;
	
	this.update = function(speed) {
		pos.x -= Math.round(speed*Math.pow(scale, .4));
		//pos.x = Math.round(pos.x);
		if(pos.x < -100) {
			pos.x += 1000+Math.random()*300;
			pos.y = 160+Math.max(.2, Math.random())*90;
			scale = 1-(250 - pos.y)/90+.1;
			return true;
		}
	};
	
	this.draw = function(ctx) {
		ctx.drawImage(image, pos.x, pos.y, 176/3*scale, 216/3*scale);
	};
	
	this.pos = function() {
		return pos;
	};
}
