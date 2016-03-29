

function Car(pos, size) {
	var pos = pos;
	var size = size;
	var image = new Image();
	image.src = "Res/car_side.png";
	var target = null;
	var dy = 7;
	
	this.update = function() {
		if(target != null) {
			if(pos.y > target)
				pos.y = Math.max(target, pos.y-dy);
			else pos.y = Math.min(target, pos.y+dy);
			
			if(pos.y == target)
				target = null;
		}
	};
	
	this.draw = function(ctx) {
		ctx.drawImage(image, pos.x-size.width/2, pos.y-size.height/2);
		//ctx.fillStyle = "red";
		//ctx.fillRect(pos.x-size.width/2, pos.y-size.height/2, size.width, size.height);
	};
	
	this.moveTo = function(yVal) {
		target = yVal;
	};
}