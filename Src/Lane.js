

function Lane(number, pos, size, answer) {
	var number = number;
	var pos = pos;
	var size = size;
	var answer = answer;
	
	var highlighted = false;
	var wrong = false;
	var right = false;
	
	this.update = function() {
		
	};
	
	this.draw = function(ctx) {
		if(wrong)
			ctx.fillStyle = "red";
		else if(right)
			ctx.fillStyle = "green";
		else if(highlighted)
			ctx.fillStyle = "grey";
		else ctx.fillStyle = "black";
		ctx.fillRect(pos.x, pos.y, size.width, size.height);
		
		ctx.fillStyle = "white";
		ctx.font = "20px Airstrike";
		ctx.fillText(answer, pos.x+size.width/2, pos.y+size.height/2+5);
	};
	
	this.highlight = function() {
		highlighted = true;
	};
	
	this.unhighlight = function() {
		highlighted = false;
	};
	
	this.isHighlighted = function() {
		return highlighted;
	};
	
	this.markWrong = function() {
		wrong = true;
	};
	
	this.markRight = function() {
		right = true;
	};
	
	this.reset = function() {
		wrong = false;
		right = false;
	};
	
	this.setAnswer = function(newAnswer) {
		answer = newAnswer;
	};
	
	this.getAnswer = function() {
		return answer;
	};
	
	this.pointWithin = function(mouse) {
		if(mouse.x > pos.x && mouse.x < pos.x+size.width &&
		mouse.y > pos.y && mouse.y < pos.y+size.height)
			return true;
		return false;
	};
	
	this.getYCenter = function() {
		return pos.y+size.height/2;
	};
}
