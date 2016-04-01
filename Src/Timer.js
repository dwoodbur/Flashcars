

function Timer(pos) {
	var pos = pos;
	var timeLeft = 60;
	
	this.tick = function() {
		timeLeft--;
	};
	
	this.draw = function(ctx) {
		// Color based on time.
		if(timeLeft > 35)
			ctx.fillStyle = "green";
		else if(timeLeft > 10)
			ctx.fillStyle = "orange";
		else ctx.fillStyle = "red";
		ctx.strokeStyle = "black";
		// Draw circle.
		ctx.lineWidth = 8;
		ctx.beginPath();
		ctx.arc(pos.x, pos.y, 70, 0, 2*Math.PI);
		ctx.fill();
		ctx.stroke();
		// Shift based on number of digits, draw number.
		var timeShift = 0;
		if(timeLeft < 10)
			timeShift = 20;
		ctx.fillStyle = "white";
		ctx.font = "75px Airstrike";
		ctx.fillText(timeLeft, pos.x-53+timeShift, pos.y+18);
	};
	
	/* PUBLIC METHODS */
	
	this.timeLeft = function() {
		return timeLeft;
	};
}
