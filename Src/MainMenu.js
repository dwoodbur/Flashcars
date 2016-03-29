

function MainMenu() {
	/* Private Data */
	
	var canvas = document.getElementById('main-canvas');
	var ctx = canvas.getContext('2d');
	var playButton = new Button("Play", {x:canvas.width/2, y:canvas.height/2}, {w:100, h:50}, "green", "black", "#00cc00", "30px Arial");
	
	var transition = -1;
	
	var lanes = [];
	for(var i=0; i<4; i++)
		lanes.push(new Lane(i+1, {x:0, y:canvas.height-208+(i*52)}, {width:canvas.width, height:50}, ""));
		
	var blackRects = [];
	for(var i=0; i<15; i++)
		blackRects.push(new BlackRectangle({x:i*60, y:canvas.height-208}, {width: 30, height: 206}, canvas.width));
	
		
	/* Public Methods */
	
	// Update Method
	this.update = function() {
		
	};
	
	// Draw Method
	this.draw = function() {
		ctx.fillStyle = "#0099cc";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		ctx.fillStyle = "white";
		ctx.fillRect(0, canvas.height-210, canvas.width, 210);
		for(var i in lanes)
			lanes[i].draw(ctx);
			
		for(var i in blackRects)
			blackRects[i].draw(ctx);
			
		ctx.fillStyle = "orange";
		ctx.font = "90px Arial";
		ctx.fillText("Flashcars!", 220, 120);
		ctx.fillStyle = "black";
		ctx.font = "20px Arial";
		ctx.fillText("by Dylan Woodbury", 340, 150);
		
		playButton.draw(ctx);
	};
	
	this.getTransition = function() {
		return transition;
	};
	
	// Returns mouse position, records click type.
	function getMousePos(evt) {
    	var rect = canvas.getBoundingClientRect();
    	
    	return {
    		x: Math.floor(evt.clientX - rect.left),
    		y: Math.floor(evt.clientY - rect.top)
    	};
    }
    
    // Handles checks/effects for mouse movement.
    function mouseMove(mousePos) {
    	if(playButton.pointWithin(mousePos))
    		playButton.highlight();
    	else if(playButton.isHighlighted())
    		playButton.unhighlight();
    }
	
	// Handles checks/effects of click down.
	function mouseDown(mousePos) {
	}
	
	// Handles checks/effects of click release.
	function mouseUp(mousePos) {
		if(playButton.pointWithin(mousePos))
			transition = GO_TO_TOPIC_MENU;
	}
	
	// Creates, adds mouse event handlers (above).
	function down(evt){mouseDown(getMousePos(evt));}
	function move(evt){mouseMove(getMousePos(evt));}
	function up(evt){mouseUp(getMousePos(evt));}
    canvas.addEventListener('mousedown', down, false);
	canvas.addEventListener('mousemove', move, false);
	canvas.addEventListener('mouseup', up, false);
}
