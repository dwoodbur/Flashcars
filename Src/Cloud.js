

function Cloud(pos, randomImg, randomSpeed) {
	var pos = pos;
	var image = new Image();
	if(randomImg < .2)
		image.src = "Res/cloud1.png";
	else if(randomImg < .4)
		image.src = "Res/cloud2.png";
	else if(randomImg < .6)
		image.src = "Res/cloud3.png";
	else if(randomImg < .8)
		image.src = "Res/cloud4.png";
	else image.src = "Res/cloud5.png";

	var speedScale = randomSpeed;	
	
	this.update = function(speed) {
		// slowly shift cloud based on a given random number.
		pos.x -= speed*speedScale;
		if(pos.x+image.width/2 < 0) {
			pos.x += 850+image.width/2 + Math.random()*200;
			pos.y = Math.random()*130-30;
		}
	};
	
	this.draw = function(ctx) {
		ctx.drawImage(image, pos.x, pos.y, image.width/2, image.height/2);
	};
}
