
var CanvasText = new CanvasText;

function Flashcard(pos, size, question, canvas) {
	var pos = pos;
	var size = size;
	var question = question;
	
	var borderWidth = 4;
	
	// Configure CanvasText.
	CanvasText.config({
				canvas: canvas,
				context: canvas.getContext('2d'),
				fontFamily: "Arial",
				fontSize: "25px",
				fontWeight: "normal",
				fontColor: "#000",
				lineHeight: "25"
			});
	
	this.update = function() {
		
	};
	
	this.draw = function(ctx, correct) {
		ctx.fillStyle = "black";
		ctx.fillRect(pos.x-borderWidth, pos.y-borderWidth, size.width+borderWidth*2, size.height+borderWidth*2);
		ctx.fillStyle = "white";
		ctx.fillRect(pos.x, pos.y, size.width, size.height);
		
		CanvasText.drawText({
				text: question.definition,
				x: pos.x+15,
				y: pos.y+25,
				boxWidth: size.width-30,
				cacheId: question.definition+"_id"
			});
			
		if(correct != null) {
			if(correct)
				ctx.fillStyle = "green";
			else ctx.fillStyle = "red";
			ctx.font = "25px Arial";
			ctx.fillText(question.term, pos.x+size.width/2-ctx.measureText(question.term).width/2, pos.y+size.height-15);
		}
	};
	
	this.setQuestion = function(newQuestion) {
		question = newQuestion;
	};
}
